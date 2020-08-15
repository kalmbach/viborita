// viborita
let canvas;
let ctx;

const defaultTailSize = 3;
let tailSize = defaultTailSize;
const snakeTrail = [{ x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 }];
let snakeX = 10;
let snakeY = 10;

const gridSize = 20;
const tileSize = 20;
let nextX = 0;
let nextY = 0;

let appleX = 15;
let appleY = 15;

const tps = 6; // Time Per Second
let drawInterval;
let score = 0;

function paintBoard() {
  // reset background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function paintApple() {
  // paint apple
  ctx.fillStyle = 'red';
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
}

function paintScore() {
  document.getElementById('score').innerText = score;
}

function paintSnake() {
  // paint snake
  ctx.fillStyle = 'purple';
  ctx.fillRect(
    snakeTrail[snakeTrail.length - 1].x * tileSize,
    snakeTrail[snakeTrail.length - 1].y * tileSize,
    tileSize,
    tileSize,
  );

  ctx.fillStyle = 'green';
  for (let i = 0; i < snakeTrail.length - 1; i += 1) {
    ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize,
    );

    if (snakeTrail[i].x === snakeX && snakeTrail[i].y === snakeY) {
      tailSize = defaultTailSize;
      clearInterval(drawInterval);
    }
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

  paintBoard();
  paintApple();
  paintSnake();

  if (snakeX === appleX && snakeY === appleY) {
    tailSize += 1;
    score += 1;
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);

    paintScore();
  }

  // set snake trail
  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
}

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

  if (!drawInterval) {
    drawInterval = setInterval(draw, 1000 / tps);
  }
}

window.onload = function () {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  paintBoard();
  paintApple();
  paintSnake();

  document.addEventListener('keydown', keyDownEvent);
};
