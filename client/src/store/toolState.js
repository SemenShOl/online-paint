import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;
  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool) {
    this.tool = tool;
  }

  setStrokeStyle(color) {
    this.tool.strokeStyle = color;
  }

  setFillStyle(color) {
    this.tool.fillStyle = color;
  }

  setLineWidth(width) {
    this.tool.lineWidth = width;
  }
}

export default new ToolState();
