import React from "react";
import "../styles/bar.scss";
import canvasState from "../store/canvasState";
import { Rectangle, Circle, Eraser, Line, Brush } from "../tools";
import toolState from "../store/toolState";
import styleState from "../store/styleState";
const Toolbar = () => {
  const changeColor = (e) => {
    // toolState.setFillStyle(e.target.value);
    // toolState.setStrokeStyle(e.target.value);
    styleState.setFillStyle(e.target.value);
  };

  const savePictureHandler = () => {
    const dataUrl = canvasState.canvas.toDataURL();
    console.log(dataUrl);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "paint" + canvasState.sessionID + ".jpg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <div className="toolbar">
      <button
        className="toolbar__btn brush"
        onClick={() =>
          toolState.setTool(
            new Brush(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionID
            )
          )
        }
      />
      <button
        className="toolbar__btn circle"
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      />
      <button
        className="toolbar__btn eraser"
        onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
      />

      <div
        className="toolbar__btn line"
        onClick={() => toolState.setTool(new Line(canvasState.canvas))}
      ></div>

      <button
        className="toolbar__btn rect"
        onClick={() =>
          toolState.setTool(
            new Rectangle(
              canvasState.canvas,
              canvasState.socket,
              canvasState.sessionID
            )
          )
        }
      />
      <input type="color" className="color" onChange={(e) => changeColor(e)} />
      <button
        className="toolbar__btn undo"
        onClick={() => canvasState.undo()}
      />
      <button
        className="toolbar__btn redo"
        onClick={(e) => canvasState.redo()}
      />
      <button className="toolbar__btn save" onClick={savePictureHandler} />
    </div>
  );
};

export default Toolbar;
