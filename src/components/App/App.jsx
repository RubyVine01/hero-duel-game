import "./App.css";

import DuelGame from "../DuelGame/DuelGame";
import HeroControls from "../HeroControls/HeroControls";

function App() {
  return (
    <div className="app">
      <DuelGame />
      <div className="controls-container">
        <HeroControls playerId="player-1" />
        <HeroControls playerId="player-2" />
      </div>
    </div>
  );
}

export default App;
