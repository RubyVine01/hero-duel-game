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
    console.log(`${position} ${heroStore.heroSettings[position].fireRate}`);
  };

  return (
    <div className="hero-controls-container">
      <h2>Hero controls</h2>
      <RangeInput
        labelName="Speed"
        min={1}
        max={5}
        step={1}
        id={`speed-${position}`}
        onChange={handleSpeedChange}
      />
      <RangeInput
        labelName="Fire Rate"
        min={300}
        max={2000}
        step={100}
        id={`fire-rate-${position}`}
        onChange={handleFireRateChange}
      />
    </div>
  );
});

export default HeroControls;
