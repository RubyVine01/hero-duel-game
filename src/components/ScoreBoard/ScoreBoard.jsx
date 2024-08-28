import "./ScoreBoard.css";
import { observer } from "mobx-react-lite";
import heroStore from "../../store/HeroStore";

const ScoreBoard = observer(({}) => {
  return (
    <div className="scoreboard__container">
      <div className="scoreboard">
        <div className="score-title">SCORE</div>
        <div className="score-content">
          <div className="score-value__container">
            <span className="score-value">
              {heroStore.heroSettings.left.score}
            </span>
          </div>
          <span className="divider">:</span>
          <div className="score-value__container">
            <span className="score-value">
              {heroStore.heroSettings.right.score}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ScoreBoard;
