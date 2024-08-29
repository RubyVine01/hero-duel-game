export default class Spell {
  constructor(context, x, y, direction, settings) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.spellColor = settings.spellColor;
    this.radius = 5;
    this.speed = 1;
    this.direction = direction;
    this.isActive = true;
    this.settings = settings;
  }

  // обновляет позицию заклинания
  update() {
    this.x += this.speed * this.direction;
    if (this.x < 0 || this.x > this.context.canvas.width) {
      this.explode();
      this.isActive = false;
    }
  }

  // отрисовывает заклинания
  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.context.fillStyle = this.spellColor;
    this.context.fill();
    this.context.closePath();
  }

  // Проверяет столкновение заклинания с заданной целью 
  checkCollision(target) {
    const dx = this.x - target.x;
    const dy = this.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + target.radius;
  }

  // Отвечает за визуализацию взрыва заклинания
  explode() {
    const explosionRadius = this.radius * 3;
    this.context.beginPath();
    this.context.arc(this.x, this.y, explosionRadius, 0, Math.PI * 2, false);
    this.context.fillStyle = this.spellColor;
    this.context.fill();
    this.context.closePath();
  }
}
