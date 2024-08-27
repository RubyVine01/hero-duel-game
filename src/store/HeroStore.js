import { makeAutoObservable } from "mobx";

class HeroStore {
  heroSettings = {
    left: {
      heroSpeed: 0.5,
      heroColor: "red",
      fireRate: 500,
      spellСolor: "black",
      side: "left",
    },
    right: {
      heroSpeed: 0.5,
      heroColor: "blue",
      fireRate: 500,
      spellСolor: "orange",
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
