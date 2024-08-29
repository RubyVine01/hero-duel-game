import { useState } from "react";
import heroStore from "../../store/HeroStore";
import "./HeroPopupMenu.css";
import { colorSpellArray } from "../../constants/colorSpellArray";

const HeroPopupMenu = ({ heroSide, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(colorSpellArray[0]);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleApplyColor = () => {
    heroStore.setHeroSpellColor(heroSide, selectedColor);
    onClose();
  };

  return (
    <div className="hero-popup-menu">
      <h3>{`Change Spell Color (${heroSide})`}</h3>
      <div className="radio-group">
        {colorSpellArray.map((color, index) => (
          <label key={index} className="radio-label">
            <input
              type="radio"
              value={color}
              checked={selectedColor === color}
              onChange={handleColorChange}
              className="radio-input"
            />
            <span
              className={`color-circle ${
                selectedColor === color ? "selected" : ""
              }`}
              style={{ backgroundColor: color }}
            ></span>
          </label>
        ))}
      </div>
      <div className="buttons">
        <button onClick={handleApplyColor} className="save-button">
          Apply
        </button>
        <button onClick={onClose} className="cancel-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default HeroPopupMenu;
