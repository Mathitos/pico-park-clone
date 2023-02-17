console.log('initing game ...')

const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = 1024 // 64 * 16
canvas.height = 576 // 64 * 9

const player1 = {
  color: 'red',
  height: 30,
  width: 30,
  x: 0,
  y: 0,
  xSpeed: 0,
  ySpeed: 0,
  gravitySpeed: 0.2,
  jumpSpeed: 10,
  movementSpeed: 5,
  rightKeyDown: false,
  leftKeyDown: false,
  isJumping: false,
}

const drawPlayer = player => {
  canvasContext.fillStyle = player.color
  canvasContext.fillRect(player.x, player.y, player.width, player.height)
}

const playerJump = player => {
  if (!player.isJumping) {
    player1.ySpeed -= player1.jumpSpeed
    player.isJumping = true
  }
}

const updatePlayer = player => {
  player.y += player.ySpeed
  player.x += player.xSpeed

  if (player1.leftKeyDown) {
    player1.xSpeed = -player1.movementSpeed
  } else if (player.xSpeed < 0) {
    player.xSpeed += 1
  }
  if (player1.rightKeyDown) {
    player1.xSpeed = player1.movementSpeed
  } else if (player.xSpeed > 0) {
    player.xSpeed -= 1
  }

  player.ySpeed += player.gravitySpeed

  // check up and down map constraints
  if (player.height + player.y > canvas.height) {
    player.y = canvas.height - player.height
    player.isJumping = false
    player.ySpeed = 0
  } else if (player.y < 0) {
    player.y = 0
    player.ySpeed = 0
  }

  // check right and left map constraints
  if (player.width + player.x > canvas.width) {
    player.x = canvas.width - player.width
    player.xSpeed = 0
  } else if (player.x < 0) {
    player.x = 0
    player.xSpeed = 0
  }
}

const clearCanvas = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)
}

const handleKeyboardEvents = event => {
  if (event.key == 'a') {
    player1.leftKeyDown = event.type == 'keydown'
  }
  if (event.key == 'd') {
    player1.rightKeyDown = event.type == 'keydown'
  }
  if (event.key == ' ' && event.type == 'keydown') {
    playerJump(player1)
  }
}

const animateLoop = () => {
  clearCanvas()
  updatePlayer(player1)
  drawPlayer(player1)
  window.requestAnimationFrame(animateLoop)
}

window.addEventListener('keydown', handleKeyboardEvents)
window.addEventListener('keyup', handleKeyboardEvents)

animateLoop()
