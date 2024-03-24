import React from "react";
import "../styles/bar.scss";
import toolState from "../store/toolState";
import styleState from "../store/styleState";

const SettingsBar = () => {
  return (
    <div className="settingsbar">
      <lable htmlFor="line-width">Толщина линии</lable>
      <input
        id="line-width"
        style={{ marginLeft: "8px" }}
        onChange={(e) => styleState.setLineWidth(e.target.value)}
        type="number"
        defaultValue={1}
        min={1}
        max={30}
      />
      <lable htmlFor="stroke-color">Цвет линии</lable>
      <input
        id="stroke-color"
        style={{ marginLeft: "8px" }}
        onChange={(e) => styleState.setStrokeStyle(e.target.value)}
        type="color"
      />
    </div>
  );
};
export default SettingsBar;
