import "./App.css";
import heroStore from "../../store/HeroStore";
import DuelGame from "../DuelGame/DuelGame";
import HeroControls from "../HeroControls/HeroControls";
import ScoreBoard from "../ScoreBoard/ScoreBoard";

function App() {
  return (
    <div className="app">
      <ScoreBoard />
      <DuelGame />
      <div className="controls-container">
        <HeroControls position={heroStore.heroSettings["left"].side} />
        <HeroControls position={heroStore.heroSettings["right"].side} />
      </div>
    </div>
  );
}

export default App;
