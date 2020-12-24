import Paddle from './paddle.js'

export default class Player extends Paddle {
  update(progress, pressedKeys, bounds) {
    if (pressedKeys.up) {
      this.y -= progress * 500
    }

    if (pressedKeys.down) {
      this.y += progress * 500
    }

    if (this.y < 0) this.y = 0
    if (this.bottom > bounds.height) this.bottom = bounds.height
  }

  hit(ball)  {
    if (ball.x <= this.right && ball.x > this.x) {
      let hitFactor = (ball.y - (this.y - ball.r)) / (this.height + ball.r * 2)

      if (hitFactor >= 0 && hitFactor <= 1) {
        ball.x = this.right
        ball.vx = -ball.vx
        ball.vy = ((8 * hitFactor) - 4) * ((Math.floor(Math.random() * (14 - 10) ) + 10) / 10)
      }
    }
  }
}
