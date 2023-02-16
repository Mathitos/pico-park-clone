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
  movementSpeed: 10
}

const drawPlayer = (player) => {
  canvasContext.fillStyle = player.color
  canvasContext.fillRect(player.x, player.y, player.width, player.height)
}

const updatePlayer = (player) => {
  player.y += player.ySpeed
  player.x += player.xSpeed
  if(player.xSpeed > 0) {
    player.xSpeed -= 1
  } else if( player.xSpeed < 0){
    player.xSpeed += 1
  }

  player.ySpeed += player.gravitySpeed


  // check up and down map constraints
  if((player.height + player.y) > canvas.height) {
    player.y = canvas.height - player.height
    player.ySpeed = 0
  } else if (player.y < 0) {
    player.y = 0
    player.ySpeed = 0
  }


  // check right and left map constraints
  if((player.width + player.x) > canvas.width) {
    player.x = canvas.width - player.width
    player.xSpeed = 0
  }else if(player.x < 0) {
    player.x = 0
    player.xSpeed = 0
  }
}


const clearCanvas = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)
}

const watchKeyBoardEvents = () => {
  window.addEventListener('keydown', (event) => {
    if(event.key == "a") {
      player1.xSpeed -= player1.movementSpeed
    } else if(event.key == "d") {
      player1.xSpeed += player1.movementSpeed
  } else if(event.key == " ") {
    player1.ySpeed -= player1.jumpSpeed
  } else {
      console.log(event)
    }
  })
}


const animateLoop = () => {
  clearCanvas()
  updatePlayer(player1)
  drawPlayer(player1)
  window.requestAnimationFrame(animateLoop)
}

watchKeyBoardEvents()
animateLoop()
