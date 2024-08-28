import "./HeroControls.css";

import RangeInput from "../RangeInput/RangeInput";
import heroStore from "../../store/HeroStore";
import { observer } from "mobx-react-lite";

const HeroControls = observer(({ position }) => {
  const handleSpeedChange = (speed) => {
    heroStore.setHeroSpeed(position, speed);
  };

  const handleFireRateChange = (fireRate) => {
    heroStore.setHeroFireRate(position, fireRate);
  };

  return (
    <div className="hero-controls-container">
      <h2>Hero controls</h2>
      <RangeInput
        labelName="Speed"
        min={0}
        max={3}
        step={0.5}
        id={`speed-${position}`}
        initialValue={heroStore.heroSettings[position].heroSpeed}
        onChange={handleSpeedChange}
      />
      <RangeInput
        labelName="Fire Rate (per min)"
        min={0}
        max={100}
        step={10}
        id={`fire-rate-${position}`}
        initialValue={heroStore.heroSettings[position].fireRate}
        onChange={handleFireRateChange}
      />
    </div>
  );
});

export default HeroControls;
