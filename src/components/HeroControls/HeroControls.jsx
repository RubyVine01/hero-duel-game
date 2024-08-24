import { useState } from "react";
import "./HeroControls.css";

const HeroControls = () => {
  const [rangeValue, setRangeValue] = useState(0);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  return (
    <div className="hero-controls-container">
      <h2>Hero controls</h2>
      <div className="rate-input__container">
        <input
          id="range"
          type="range"
          min="1"
          max="5"
          step={1}
          className="rate-input"
          value={rangeValue}
          onChange={handleRangeChange}
        />
        <label for="range" className="rate-input__label">
          {`Rate: ${rangeValue}`}
        </label>
      </div>
    </div>
  );
};

export default HeroControls;
