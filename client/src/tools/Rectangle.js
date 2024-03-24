import Tool from "./Tool";
import styleState from "../store/styleState";
export class Rectangle extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    super.listen();
    super.fillStyle = styleState.fillStyle;
    super.lineWidth = styleState.lineWidth;
    super.strokeStyle = styleState.strokeStyle;
  }

  mouseUpHandler(e) {
    this.isPushed = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "rect",
          x: this.currentX,
          y: this.currentY,
          width: this.width,
          height: this.height,
          fillStyle: styleState.fillStyle,
          strokeStyle: styleState.strokeStyle,
        },
      })
    );
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
    this.context.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );

    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;

    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.isPushed) {
      this.currentX = e.pageX - e.target.offsetLeft;
      this.currentY = e.pageY - e.target.offsetTop;
      this.height = this.startY - this.currentY;
      this.width = this.startX - this.currentX;
      this.draw(this.currentX, this.currentY, this.width, this.height);
    }
  }

  draw(x, y, width, height) {
    super.fillStyle = styleState.fillStyle;
    super.lineWidth = styleState.lineWidth;
    super.strokeStyle = styleState.strokeStyle;
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      // this.context.moveTo(this.startX, this.startY);
      this.context.rect(x, y, width, height);
      this.context.fill();
      this.context.stroke();
    };
  }

  static staticDraw(context, x, y, width, height, fillStyle, strokeStyle) {
    // context.fillStyle = styleState.fillStyle;
    // context.lineWidth = styleState.lineWidth;
    context.fillStyle = fillStyle;
    context.strokeStyle = strokeStyle;
    context.beginPath();
    context.rect(x, y, width, height);
    context.fill();
    context.stroke();
  }
}

export default Rectangle;
