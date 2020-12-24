export default class Paddle {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.score = 0
  }

  render(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  get centerY() {
    return this.y + this.height / 2
  }

  get right() {
    return this.x + this.width
  }

  get bottom() {
    return this.y + this.height
  }

  set bottom(y) {
    this.y = y - this.height
  }

  set center(y) {
    this.y = y - this.height / 2
  }
}
