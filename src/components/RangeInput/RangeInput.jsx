import { useEffect, useState } from "react";
import "./RangeInput.css";

const RangeInput = ({ id, labelName, min, max, onChange, step, initialValue }) => {
  const [rangeValue, setRangeValue] = useState(min);


  useEffect(() => {
    setRangeValue(initialValue);
  }, [initialValue]);

  const handleRangeChange = (event) => {
    const value = event.target.value;
    setRangeValue(value);
    onChange(value);
  };

  return (
    <div className="range-input__container">
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
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
