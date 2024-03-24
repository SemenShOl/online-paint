import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas = null;
  socket = null;
  sessionID = null;
  undoList = [];
  redoList = [];
  username = "";
  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  setSessionID(id) {
    this.sessionID = id;
  }

  setSocket(socket) {
    this.socket = socket;
  }
  setUsername(username) {
    this.username = username;
  }
  pushToUndo(data) {
    this.undoList.push(data);
  }

  pushToRedo(data) {
    this.redoList.push(data);
    console.log(this.redoList);
  }

  undo() {
    if (this.undoList.length > 0) {
      const ctx = this.canvas.getContext("2d");
      const img = new Image();
      const dataUrl = this.undoList.pop();
      this.pushToRedo(this.canvas.toDataURL());

      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }

  redo() {
    if (this.redoList.length > 0) {
      const ctx = this.canvas.getContext("2d");
      const img = new Image();
      const dataUrl = this.redoList.pop();
      img.src = dataUrl;
      this.pushToUndo(this.canvas.toDataURL());

      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasState();
