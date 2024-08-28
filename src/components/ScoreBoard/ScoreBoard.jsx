
import "./ScoreBoard.css";

const ScoreBoard = ({ leftScore, rightScore }) => {
  return (
    <div className="scoreboard-container">
      <div className="scoreboard">
        <div className="score-title">SCORE</div>
        <div className="score-content">
          <div className="team-score left">{leftScore}</div>
          <div className="divider">:</div>
          <div className="team-score right">{rightScore}</div>
        </div>
      </div>
    </div>
  );
};



export default ScoreBoard;
