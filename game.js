const canvas = document.getElementById("canvas")
const width = canvas.width = 800
const height = canvas.height = 500
const ctx = canvas.getContext("2d")

const paddleWidth = 15
const paddleHeight = 60
const paddleGap = 20

ctx.fillStyle = '#454342'

const keyMap = {
  38: 'up',
  40: 'down'
}

let state = {
  pressedKeys: {
    up: false,
    down: false
  }
}

function keydown(event) {
  let key = keyMap[event.keyCode]
  if (key) {
    event.preventDefault();
    state.pressedKeys[key] = true
  }
}

function keyup(event) {
  let key = keyMap[event.keyCode]
  if (key) {
    event.preventDefault();
    state.pressedKeys[key] = false
  }
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)

34.5

35



let ball = {
  r: 7,
  x: 250,
  y: height / 2,
  vx: 2,
  vy: 0.0.5,
  hit: (paddle) => {
    if (!ball.x0) return
    // 765
    // console.log(paddle.surface);
    if ((ball.x >= paddle.surface) != (ball.x0 >= paddle.surface) && ball.x != ball.x0) {
      // console.log(true);
      let gradient = (ball.x - ball.x0) / (ball.y - ball.y0)
      let intersectY = ball.y - (gradient * (ball.x - paddle.surface))
      console.log(intersectY);

      console.log(intersectY);

      if ((intersectY >= paddle.y - ball.r) && (intersectY <= paddle.y + paddle.height)) {
        ball.x = paddle.surface
        ball.vx = -ball.vx
      }
    }
  }
}

let paddleL = {
  width: paddleWidth,
  height: paddleHeight,
  x: paddleGap,
  y: (height / 2) - (paddleHeight / 2),
  get surface() { return this.x + this.width }
}

let paddleR = {
  width: paddleWidth,
  height: paddleHeight,
  x: width - paddleGap - paddleWidth,
  y: (height / 2) - (paddleHeight / 2),
  get surface() { return this.x }
}

function update(progress) {
  progress = Math.min(progress, 0.1);

  moveBall(progress)
  movePaddles(progress)
  checkBoundaries()
  checkHit()

  ball.x0 = ball.x
  ball.y0 = ball.y
}

function checkBoundaries() {
  if (ball.x > width - ball.r) {
    ball.x = width - ball.r
    ball.vx = -ball.vx
  }

  if (ball.x < ball.r) {
    ball.x = ball.r
    ball.vx = -ball.vx
  }

  if (ball.y > height - ball.r) {
    ball.y = height - ball.r
    ball.vy = -ball.vy
  }

  if (ball.y < ball.r) {
    ball.y = ball.r
    ball.vy = -ball.vy
  }
}

function moveBall(progress) {
  ball.x += ball.vx * progress * 100
  ball.y += ball.vy * progress * 100
}

function movePaddles(progress) {
  let speed = 200

  if (state.pressedKeys.up) {
    paddleL.y -= progress * speed
  }

  if (state.pressedKeys.down) {
    paddleL.y += progress * speed
  }

  // if (paddleR.y > ball.y) {
  //   paddleR.y -= progress * speed
  // } else if (paddleR.y < ball.y) {
  //   paddleR.y += progress * speed
  // }

}

function checkHit() {
  ball.hit(paddleL)
  ball.hit(paddleR)
  // let a1 = ball.y - ball.y0
  // let b1 = ball.x0 - ball.x
  // let c1 = (a1 * ball.x) + (b1 * ball.y)
  //
  // let a2 = paddle.y
  // let b2 = 0
  // let c2 = (a2 * paddle.x) + (b2 * paddle.y)
  //
  // let det = a1*b2 - a2*b1
  //
  // if (det == 0) {
  //   // parallel
  // } else {
  //   let x = (b2 * c1 - b1 * c2) / det
  //   let y = (a1 * c2 - a2 * c1) / det
  //
  //   if ((ball.x <= paddle.x + paddle.width) && (ball.x0 >= paddle.x + paddle.width)) {
  //     if (ball.y >= paddle.y && ball.y <= (paddle.y + paddle.height)) {
  //       console.log('hit');
  //       ball.x = paddle.x + paddle.width
  //       ball.vx = -ball.vx
  //     }
  //   }
  // }
}


function draw() {
  ctx.clearRect(0, 0, width, height)

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI)
  ctx.fill();

  ctx.fillRect(ball.x - ball.r, ball.y - ball.r, ball.r * 2, ball.r * 2);

  ctx.fillRect(paddleL.x, paddleL.y, paddleL.width, paddleL.height);
  ctx.fillRect(paddleR.x, paddleR.y, paddleR.width, paddleR.height);
}

function loop(timestamp) {
  let progress = (timestamp - lastRender) / 1000

  update(progress)
  draw()

  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

let lastRender = 0
window.requestAnimationFrame(loop)
