class Tool {
  constructor(canvas, socket, id) {
    this.canvas = canvas;
    this.socket = socket;
    console.log(socket);
    this.id = id;
    this.context = canvas.getContext("2d");
    this.destroyEvents();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }
  set strokeStyle(color) {
    this.context.strokeStyle = color;
  }

  set fillStyle(color) {
    this.context.fillStyle = color;
  }

  set lineWidth(width) {
    this.context.lineWidth = width;
  }

  destroyEvents() {
    this.canvas.onmousemove = null;
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
  }
}
export default Tool;
