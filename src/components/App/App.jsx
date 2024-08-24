import "./App.css";

import DuelGame from "../DuelGame/DuelGame";
import HeroControls from "../HeroControls/HeroControls";

function App() {
  return (
    <div className="app">
      <DuelGame />
      <div className="controls-container">
        <HeroControls />
        <HeroControls />
      </div>
    </div>
  );
}

export default App;
