import React, { useEffect, useRef } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import { Brush, Rectangle } from "../tools";
import { autorun } from "mobx";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useParams } from "react-router-dom";
import axios from "axios";
autorun(() => {
  console.log("redo: ", canvasState.redoList);
  console.log("undo: ", canvasState.undoList);
});

const Canvas = observer(() => {
  const canvasRef = useRef();
  const inputRef = useRef();
  const { id } = useParams();
  const [isActiveModal, setIsActiveModal] = React.useState(true);
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    axios.get(`http://localhost:5000/img?id=${id}`).then((response) => {
      const img = new Image();
      img.src = response.data;
      img.onload = () => {
        canvasState.canvas
          .getContext("2d")
          .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        canvasState.canvas
          .getContext("2d")
          .drawImage(
            img,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
      };
    });
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("ws://localhost:5000");

      canvasState.setSocket(socket);
      canvasState.setSessionID(id);
      toolState.setTool(new Brush(canvasRef.current, socket, id));

      socket.onopen = () => {
        // console.log("Connected");
        socket.send(
          JSON.stringify({
            method: "connection",
            id,
            username: canvasState.username,
          })
        );
      };
      socket.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case "connection":
            console.log(`User ${msg.username} connected`);
            break;
          case "draw":
            drawHandler(msg);
            break;
        }
        console.log(msg);
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const figure = msg.figure;
    const ctx = canvasRef.current.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y, figure.strokeStyle);
        break;
      case "finish":
        ctx.beginPath();
        break;
      case "rect":
        Rectangle.staticDraw(
          ctx,
          figure.x,
          figure.y,
          figure.width,
          figure.height,
          figure.fillStyle,
          figure.strokeStyle
        );
        break;
    }
  };
  const onMouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
    // axios
    //   .post(`http://localhost:5000/img?id=${id}`, {
    //     img: canvasRef.current.toDataURL(),
    //   })
    //   .then((resp) => console.log(resp));
  };

  const onMouseUpHandler = () => {
    axios
      .post(`http://localhost:5000/img?id=${id}`, {
        img: canvasRef.current.toDataURL(),
      })
      .then((resp) => console.log(resp));
  };

  const connectionHandler = () => {
    canvasState.setUsername(inputRef.current.value);
    if (inputRef.current.value) {
      setIsActiveModal(false);
    }
  };

  return (
    <div className="canvas">
      <Modal
        show={isActiveModal}
        onHide={() => {}}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Введите имя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input ref={inputRef} type="text" placeholder="Введите имя"></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Войти
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={onMouseDownHandler}
        onMouseUp={onMouseUpHandler}
        ref={canvasRef}
        height={500}
        width={800}
      ></canvas>
    </div>
  );
});
export default Canvas;
