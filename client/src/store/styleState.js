import { makeAutoObservable } from "mobx";

class StyleState {
  fillStyle = "#000000";
  strokeStyle = "#000000";
  lineWidth = "2";
  constructor() {
    makeAutoObservable(this);
  }

  setStrokeStyle(color) {
    // console.log(this.tool);
    this.strokeStyle = color;
  }

  setFillStyle(color) {
    this.fillStyle = color;
  }

  setLineWidth(width) {
    // console.log(this.tool);
    this.lineWidth = width;
  }
}
export default new StyleState();
