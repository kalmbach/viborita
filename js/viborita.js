// viborita
let canvas;
let ctx;

const defaultTailSize = 3;
let tailSize = defaultTailSize;
const snakeTrail = [];
let snakeX = 10;
let snakeY = 10;

const gridSize = 20;
const tileSize = 20;
let nextX = 0;
let nextY = 0;

let appleX = 15;
let appleY = 15;

function keyDownEvent(e) {
  switch (e.keyCode) {
    case 37:
      nextX = -1;
      nextY = 0;
      break;
    case 38:
      nextX = 0;
      nextY = -1;
      break;
    case 39:
      nextX = 1;
      nextY = 0;
      break;
    case 40:
      nextX = 0;
      nextY = 1;
      break;
    default:
      nextX = 0;
      nextY = 0;
  }
}

function draw() {
  snakeX += nextX;
  snakeY += nextY;

  if (snakeX < 0) {
    snakeX = gridSize - 1;
  }
  if (snakeX > gridSize - 1) {
    snakeX = 0;
  }
  if (snakeY < 0) {
    snakeY = gridSize - 1;
  }
  if (snakeY > gridSize - 1) {
    snakeY = 0;
  }

  if (snakeX === appleX && snakeY === appleY) {
    tailSize += 1;
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }

  // reset background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // paint snake
  ctx.fillStyle = 'green';
  for (let i = 0; i < snakeTrail.length; i += 1) {
    ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize,
    );

    if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY) {
      tailSize = defaultTailSize;
    }
  }

  // paint apple
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

  // set snake trail
  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
}

window.onload = function () {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  document.addEventListener('keydown', keyDownEvent);

  const tps = 6; // Time Per Second
  setInterval(draw, 1000 / tps);
};
