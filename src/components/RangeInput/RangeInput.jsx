import { useState } from "react";
import "./RangeInput.css";

const RangeInput = ({ id, labelName, min, max }) => {
  const [rangeValue, setRangeValue] = useState(1);

  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
  };

  return (
    <div className="range-input__container">
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        className="range-input"
        value={rangeValue}
        onChange={handleRangeChange}
      />
      <label htmlFor={id} className="range-input__label">
        {`${labelName}: ${rangeValue}`}
      </label>
    </div>
  );
};

export default RangeInput;
