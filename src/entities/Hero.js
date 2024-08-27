import Spell from "./Spell";

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
    this.score = 0;
    this.isHit = false;
    this.hitEffectDuration = 0;
    this.spellСolor = settings.spellСolor;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.context.fillStyle = this.heroColor;
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
    this.y += this.heroSpeed * this.direction;
    if (
      this.y + this.radius > this.context.canvas.height ||
      this.y - this.radius < 0
    ) {
      this.direction *= -1;
    }

    const now = Date.now();
    if (now - this.lastShotTime > this.fireRate) {
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
    if (newSettings.heroSpeed !== undefined) {
      this.heroSpeed = newSettings.heroSpeed;
    }
    if (newSettings.fireRate !== undefined) {
      this.fireRate = newSettings.fireRate;
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

  hit() {
    this.isHit = true;
    this.hitEffectDuration = 20; // Длительность эффекта удара
    this.score += 1;
  }
}
