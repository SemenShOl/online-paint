import Toolbar from "./components/Toolbar";
import SettingsBar from "./components/SettingsBar";
import Canvas from "./components/Canvas";

import "./styles/app.scss";

function App() {
  return (
    <div className="app">
      <SettingsBar />
      <Toolbar />
      <Canvas />
    </div>
  );
}

export default App;
