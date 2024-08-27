import { useState } from "react";
import "./HeroControls.css";
import RangeInput from "../RangeInput/RangeInput";

const HeroControls = ({ playerId }) => {
  return (
    <div className="hero-controls-container">
      <h2>Hero controls</h2>
      <RangeInput labelName="Speed" min={1} max={5} id={`speed-${playerId}`} />
      <RangeInput
        labelName="Fire Rate"
        min={1}
        max={8}
        id={`fire-rate-${playerId}`}
      />
    </div>
  );
};

export default HeroControls;
