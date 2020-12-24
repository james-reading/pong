import Paddle from './paddle.js'

export default class Computer extends Paddle {
  update(progress, ball, bounds) {
    if (!ball.hidden) {
      let speed = ball.vx > 0 ? 300 : 100

      if (this.centerY > ball.y) {
        this.y -= Math.min(progress * speed, this.centerY - ball.y)
      } else if (this.centerY < ball.y) {
        this.y += Math.min(progress * speed, ball.y - this.centerY)
      }
    }
  }

  hit(ball)  {
    if (ball.right >= this.x && ball.x < this.right) {
      let hitFactor = (ball.y - (this.y - ball.r)) / (this.height + ball.r * 2)

      if (hitFactor >= 0 && hitFactor <= 1) {
        ball.right = this.x
        ball.vx = -ball.vx
      }
    }
  }

  scorePositionX(bounds) {
    return (bounds.width / 2) + 100
  }
}
