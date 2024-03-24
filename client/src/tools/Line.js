import Tool from "./Tool";
import styleState from "../store/styleState";

export class Line extends Tool {
  constructor(canvas) {
    super(canvas);

    super.listen();
  }

  mouseUpHandler(e) {
    this.isPushed = false;
  }

  mouseDownHandler(e) {
    this.isPushed = true;
    this.context.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.context.moveTo(this.startX, this.startY);
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.isPushed) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }

  draw(x, y) {
    super.fillStyle = styleState.fillStyle;
    super.lineWidth = styleState.lineWidth;
    super.strokeStyle = styleState.strokeStyle;
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.moveTo(this.startX, this.startY);
      this.context.lineTo(x, y);
      this.context.stroke();
    };
  }
}

export default Line;
