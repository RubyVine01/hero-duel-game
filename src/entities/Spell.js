export default class Spell {
  constructor(context, x, y, direction, color, speed = 3) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 5;
    this.speed = speed;
    this.direction = direction;
    this.isActive = true;
  }

  update() {
    this.x += this.speed * this.direction;
    if (this.x < 0 || this.x > this.context.canvas.width) {
      this.explode();
      this.isActive = false;
    }
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }

  checkCollision(target) {
    const dx = this.x - target.x;
    const dy = this.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + target.radius;
  }

  explode() {
    const explosionRadius = this.radius * 3;
    this.context.beginPath();
    this.context.arc(this.x, this.y, explosionRadius, 0, Math.PI * 2, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }
}
