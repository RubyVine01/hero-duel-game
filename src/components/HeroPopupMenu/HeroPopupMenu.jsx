import { useState } from "react";
import heroStore from "../../store/HeroStore";
import "./HeroPopupMenu.css";

const colors = [
  "#FF4500",
  "#1E90FF",
  "#32CD32",
  "#FF69B4",
  "#FFA500",
  "#00CED1",
  "#00FF7F",
  "#8A2BE2",
  "#FFD700",
  "#FF6347",
];

const HeroPopupMenu = ({ heroSide, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleApplyColor = () => {
    heroStore.setHeroSpellColor(heroSide, selectedColor);
    onClose();
  };

  return (
    <div className="hero-popup-menu">
      <h3>Change Spell Color</h3>
      <div className="radio-group">
        {colors.map((color, index) => (
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


