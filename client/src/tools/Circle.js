import Tool from "./Tool";
import styleState from "../store/styleState";
export class Circle extends Tool {
  constructor(canvas) {
    super(canvas);
    super.listen();

    // super.fillStyle = "black";
    // super.lineWidth = "1";
    // super.strokeStyle = "none";
  }

  mouseUpHandler(e) {
    this.isPushed = false;
  }

  mouseDownHandler(e) {
    this.isPushed = true;
    this.context.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;

    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.isPushed) {
      this.currentX = e.pageX - e.target.offsetLeft;
      this.currentY = e.pageY - e.target.offsetTop;
      this.radius = Math.sqrt(
        (this.startY - this.currentY) ** 2 + (this.startX - this.currentX) ** 2
      );
      this.draw(this.currentX, this.currentY, this.width, this.height);
    }
  }

  draw() {
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
      this.context.arc(
        this.startX,
        this.startY,
        this.radius,
        0,
        2 * Math.PI,
        false
      );
      this.context.fill();
      this.context.stroke();
    };
  }
}
