import Tool from "./Tool";
import styleState from "../store/styleState";

export class Eraser extends Tool {
  constructor(canvas) {
    super(canvas);
    super.listen();
    super.fillStyle = "none";
    super.lineWidth = "10";
    super.strokeStyle = "#ffffff";
  }

  // set strokeStyle(color) {
  //   super.fillStyle = "none";
  // }

  // set fillStyle(color) {
  //   super.lineWidth = "10";
  // }

  // set lineWidth(width) {
  //   super.strokeStyle = "#ffffff";
  // }
  mouseUpHandler(e) {
    this.isPushed = false;
  }

  mouseDownHandler(e) {
    this.isPushed = true;
    this.context.beginPath();
    this.context.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
  }

  mouseMoveHandler(e) {
    if (this.isPushed) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }

  draw(x, y) {
    this.context.lineTo(x, y);

    this.context.stroke();
  }
}
