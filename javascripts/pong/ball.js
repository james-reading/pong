export default class Ball {
  constructor(x, y, r, canvas) {
    this.x = x
    this.y = y
    this.vx = -5
    this.vy = 0
    this.r = r
    this.canvas = canvas
    this.hidden = true
  }

  update(progress) {
    this.x += this.vx * progress * 100
    this.y += this.vy * progress * 100

    if (this.y > this.canvas.height - this.r) {
      this.y = this.canvas.height - this.r
      this.vy = -this.vy
    }

    if (this.y < this.r) {
      this.y = this.r
      this.vy = -this.vy
    }
  }

  render(ctx) {
    if (!this.hidden) {
      ctx.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    }
  }

  serve() {
    this.hidden = true
    this.x = this.canvas.width / 2
    this.y = Math.floor(Math.random() * (this.canvas.height - 200) ) + 100

    let vx = this.vx
    this.vx = 0
    this.vy = 0

    setTimeout(() => {
      this.vx = vx
      this.vy = (Math.random() * 6.0) - 3.0
      this.hidden = false
    }, 1000)
  }

  get left() {
    return this.x - this.r
  }

  get right() {
    return this.x + this.r
  }

  get bottom() {
    return this.y + this.r
  }

  set right(x) {
    this.x = x - this.r
  }
}
