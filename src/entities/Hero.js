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
    this.settings = settings;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }

  update() {
    this.y += this.speed * this.direction;
    if (
      this.y + this.radius > this.context.canvas.height ||
      this.y - this.radius < 0
    ) {
      this.direction *= -1;
    }
  }

  checkMouseCollision(mousePosition) {
    const distance = Math.sqrt(
      (mousePosition.x - this.x) ** 2 + (mousePosition.y - this.y) ** 2
    );
    if (distance <= this.radius + 10) {
      this.direction *= -1;
    }
  }
}
