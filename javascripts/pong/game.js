import Player from './player.js'
import Computer from './computer.js'
import Ball from './ball.js'

const keyMap = {
  38: 'up',
  87: 'up',
  40: 'down',
  83: 'down'
}

export default class Game {
  constructor(width, height) {
    this.canvas = document.getElementById('canvas')
    this.canvas.width = width,
    this.canvas.height = height
    this.ctx = this.canvas.getContext('2d')

    this.player = new Player(20, this.canvas.height / 2 - 30, 15, 60);
    this.computer = new Computer(this.canvas.width - 35, this.canvas.height / 2 - 30, 15, 60);
    this.ball = new Ball(this.canvas.width / 2, 0, 7, this.canvas);

    this.pressedKeys = {
      up: false,
      down: false
    }

    this.running = false
    this.over = false
    this.lastRender = 0

    this.menu()
    this.listen()
  }

  listen() {
    window.addEventListener('keydown', event => {
      if (!this.running) {
				this.running = true
        this.ball.serve()
				window.requestAnimationFrame(this.loop.bind(this))
			}

      let key = keyMap[event.keyCode]
      if (key) {
        event.preventDefault();
        this.pressedKeys[key] = true
      }
    })

    window.addEventListener('keyup', event => {
      let key = keyMap[event.keyCode]
      if (key) {
        event.preventDefault();
        this.pressedKeys[key] = false
      }
    })
  }

  loop(timestamp) {
    let progress = (timestamp - this.lastRender) / 1000

    this.update(progress)
    this.draw()

    this.lastRender = timestamp

    if (!this.over) window.requestAnimationFrame(this.loop.bind(this))
  }

  update(progress) {
    progress = Math.min(progress, 0.1);

    this.ball.update(progress)
    this.player.update(progress, this.pressedKeys, this.canvas)
    this.computer.update(progress, this.ball, this.canvas)

    this.player.hit(this.ball)
    this.computer.hit(this.ball)

    if (this.ball.right > this.canvas.width) {
      this.computer.score ++
      if (this.computer.score >= 3) {
        this.over = true
      } else {
        this.ball.serve()
      }
    }

    if (this.ball.left < 0) {
      this.player.score ++
      if (this.player.score >= 3) {
        this.over = true
      } else {
        this.ball.serve()
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.fillStyle = '#454342'
    this.ctx.strokeStyle = '#454342'
    this.ctx.font = "3em 'Press Start 2P'";
    this.ctx.textAlign = 'center'
    this.ctx.lineWidth = 10;

    this.player.render(this.ctx)
    this.computer.render(this.ctx)
    this.ball.render(this.ctx)

    // Draw the scores
    this.ctx.fillText(
      this.player.score,
      (this.canvas.width / 2) - 100,
      75
    )

    this.ctx.fillText(
      this.computer.score,
      (this.canvas.width / 2) + 100,
      75
    )

    // Draw the net
    this.ctx.beginPath();
    this.ctx.setLineDash([this.canvas.height / 23, this.canvas.height / 23]);
    this.ctx.moveTo(this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
    this.ctx.stroke();


  }

  menu() {
    this.draw()

    this.ctx.fillStyle = '#DBDCD8';
    this.ctx.fillRect(
      this.canvas.width / 2 - 350,
      this.canvas.height / 2 - 48,
      700,
      100
    );

    this.ctx.font = "1em 'Press Start 2P'";
    this.ctx.fillStyle = '#454342';
    this.ctx.fillText(
      'Press any key to begin',
      this.canvas.width / 2,
      this.canvas.height / 2
    );
}
}
