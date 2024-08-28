import { makeAutoObservable } from "mobx";

class HeroStore {
  heroSettings = {
    left: {
      heroSpeed: 0,
      heroColor: "#33CCCC",
      fireRate: 0,
      spellСolor: "#FFA500",
      side: "left",
    },
    right: {
      heroSpeed: 0,
      heroColor: "#FF69B4",
      fireRate: 0,
      spellСolor: "#32CD32",
      side: "right",
    },
  };

  constructor() {
    makeAutoObservable(this);
  }

  setHeroSpeed(side, speed) {
    this.heroSettings[side].heroSpeed = speed;
  }

  setHeroColor(side, color) {
    this.heroSettings[side].heroColor = color;
  }

  setHeroFireRate(side, fireRate) {
    this.heroSettings[side].fireRate = fireRate;
  }

  setHeroSpellColor(side, spellColor) {
    this.heroSettings[side].spellСolor = spellColor;
  }
}

const heroStore = new HeroStore();
export default heroStore;
