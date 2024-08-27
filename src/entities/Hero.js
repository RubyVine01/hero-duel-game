import Spell from "./Spell";

export default class Hero {
  constructor(context, x, y, color, settings) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 20;
    this.speed = settings.speed;
    this.direction = 1;
    this.spells = [];
    this.lastShotTime = 0;
    this.shotInterval = settings.spells || 150;
    this.settings = settings;
    this.score = 0;
    this.isHit = false;
    this.hitEffectDuration = 0;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();

    this.spells.forEach((spell, index) => {
      if (spell.isActive) {
        spell.update();
        spell.draw();
      } else {
        this.spells.splice(index, 1);
      }
    });
  }

  update(opponent) {
    this.y += this.speed * this.direction;
    if (
      this.y + this.radius > this.context.canvas.height ||
      this.y - this.radius < 0
    ) {
      this.direction *= -1;
    }

    const now = Date.now();
    if (now - this.lastShotTime > this.shotInterval) {
      this.shoot(opponent);
      this.lastShotTime = now;
    }

    if (this.isHit && this.hitEffectDuration > 0) {
      this.hitEffectDuration -= 1;
      this.isHit = false;
    } else {
      this.isHit = false;
    }
  }
  checkMouseCollision(mousePosition) {
    const dx = mousePosition.x - this.x;
    const dy = mousePosition.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.radius + 10) {
      if (Math.abs(dx) > Math.abs(dy)) {
        this.direction = dx > 0 ? -1 : 1;
      } else {
        this.direction = dy > 0 ? -1 : 1;
      }
    }
  }

  updateSettings(newSettings) {
    if (newSettings.speed !== undefined) {
      this.speed = newSettings.speed;
    }
    if (newSettings.spells !== undefined && Array.isArray(newSettings.spells)) {
      this.spells = newSettings.spells;
    }
    if (newSettings.color !== undefined) {
      this.color = newSettings.color;
    }
  }

  shoot(opponent) {
    const direction = this.x < opponent.x ? 1 : -1;
    this.spells.push(
      new Spell(this.context, this.x, this.y, direction, this.color)
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

  hit() {
    this.isHit = true;
    this.hitEffectDuration = 20; // Длительность эффекта удара
    this.score += 1;
    console.log(`${this.color}: ${this.score}`);
  }
}
