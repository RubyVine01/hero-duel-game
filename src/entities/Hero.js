import Spell from "./Spell";
import heroStore from "../store/HeroStore";

export default class Hero {
  constructor(context, x, y, settings) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.settings = settings;
    this.heroColor = settings.heroColor;
    this.radius = 20;
    this.heroSpeed = settings.heroSpeed;
    this.direction = 1;
    this.spells = [];
    this.lastShotTime = 0;
    this.fireRate = settings.fireRate;
    this.score = settings.score;
    this.isHit = false;
    this.hitEffectDuration = 0;
    this.spellСolor = settings.spellСolor;
  }

  drawCircle(x, y, radius, color) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2, false);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.closePath();
  }

  draw() {
    this.drawCircle(this.x, this.y, this.radius, this.heroColor);
    this.drawCircle(this.x, this.y, this.radius / 2, "white");

    this.spells.forEach((spell, index) => {
      if (spell.isActive) {
        spell.update();
        spell.draw();
      } else {
        this.spells.splice(index, 1);
      }
    });
    this.handleHitEffect();
  }

  update(opponent) {
    this.y += this.heroSpeed * this.direction;

    if (this.y + this.radius > this.context.canvas.height) {
      this.y = this.context.canvas.height - this.radius;
      this.direction *= -1;
    }
    if (this.y - this.radius < 0) {
      this.y = this.radius;
      this.direction *= -1;
    }

    const now = Date.now();

    const shotInterval = 60000 / this.fireRate;

    if (now - this.lastShotTime > shotInterval) {
      this.shoot(opponent);
      this.lastShotTime = now;
    }

    this.handleHitEffect();
  }

  checkMouseCollision(mousePosition) {
    const dx = mousePosition.x - this.x;
    const dy = mousePosition.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + 10) {
      this.direction = dx > 0 ? -1 : 1;
      if (this.y + this.radius > this.context.canvas.height) {
        this.y = this.context.canvas.height - this.radius;
      }
      if (this.y - this.radius < 0) {
        this.y = this.radius;
      }

      return true;
    }
    return false;
  }

  updateSettings(newSettings) {
    for (const [key, value] of Object.entries(newSettings)) {
      if (value !== undefined && key in this) {
        this[key] = value;
      }
    }
  }

  shoot(opponent) {
    const direction = this.x < opponent.x ? 1 : -1;

    let offsetX;
    if (this.settings.side === "left") {
      offsetX = this.radius + 5;
    } else if (this.settings.side === "right") {
      offsetX = -(this.radius + 5);
    }

    this.spells.push(
      new Spell(
        this.context,
        this.x + offsetX,
        this.y,
        direction,
        this.settings,
        this.spellСolor
      )
    );
  }

  checkSpellsCollision(opponent) {
    this.spells.forEach((spell) => {
      if (spell.checkCollision(opponent)) {
        opponent.hit();
        spell.explode();
        spell.isActive = false;
      }
    });
  }

  handleHitEffect() {
    if (this.hitEffectDuration > 0) {
      this.hitEffectDuration -= 1;
      if (this.hitEffectDuration === 0) {
        this.isHit = false;
      }
    }
  }

  hit() {
    this.isHit = true;
    this.hitEffectDuration = 10; // Длительность эффекта удара
    // this.score += 1;
    heroStore.incrementScore(this.settings.scoreSide);
  }
}
