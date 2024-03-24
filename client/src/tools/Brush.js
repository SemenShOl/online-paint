import Tool from "./Tool";
import styleState from "../store/styleState";
export class Brush extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    super.listen();
    // super.fillStyle = "none";
    // super.lineWidth = "2";
    // super.strokeStyle = "black";
  }

  mouseUpHandler(e) {
    this.isPushed = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "finish",
        },
      })
    );
  }

  mouseDownHandler(e) {
    this.isPushed = true;
    this.context.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.context.moveTo(this.startX, this.startY);
  }

  mouseMoveHandler(e) {
    if (this.isPushed) {
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: this.id,
          figure: {
            type: "brush",
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            strokeStyle: styleState.strokeStyle,
          },
        })
      );
    }
  }

  //  draw(x, y) {
  //   super.fillStyle = styleState.fillStyle;
  //   super.lineWidth = styleState.lineWidth;
  //   super.strokeStyle = styleState.strokeStyle;
  //   this.context.lineTo(x, y);
  //   this.context.stroke();
  // }
  static draw(context, x, y, strokeStyle) {
    context.fillStyle = styleState.fillStyle;
    context.lineWidth = styleState.lineWidth;
    // ctx.strokeStyle = styleState.strokeStyle;
    context.strokeStyle = strokeStyle;
    context.lineTo(x, y);
    context.stroke();
  }
}
