import { makeAutoObservable } from "mobx";

class HeroStore {
  heroSettings = {
    left: {
      heroSpeed: 0,
      heroColor: "#3498db",
      fireRate: 0,
      spellСolor: "#FFA500",
      side: "left",
      score: 0,
      scoreSide: "right",
    },
    right: {
      heroSpeed: 0,
      heroColor: "#b41abc",
      fireRate: 0,
      spellСolor: "#32CD32",
      side: "right",
      score: 0,
      scoreSide: "left",
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
  incrementScore(side) {
    this.heroSettings[side].score += 1;
  }
}

const heroStore = new HeroStore();
export default heroStore;
