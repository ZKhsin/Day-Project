const gameBoard = document.getElementById("game-board");
const scoreEl = document.getElementById("score");
const modal = document.getElementById("modal");
const restart = document.getElementById("restart");

let lastTime = 0;
let speed = 5;
let size = 25;
const snake = [{ x: 11, y: 11 }];
let food = {
  x: Math.floor(Math.random() * size) + 1,
  y: Math.floor(Math.random() * size) + 1,
};
let direction = { x: 0, y: 0 };
let lastdirection = { x: 0, y: 0 };
let expansion = 1;
let tail = 0;
let score = 0;

// Main function set snack animation and go on update & draw
function main(currentTime) {
  window.requestAnimationFrame(main);
  const secondLastTime = (currentTime - lastTime) / 1000;
  if (secondLastTime < 1 / speed) return;

  lastTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

// Update function go on update snake, check score and move on error part
function update() {
  updateSnake();

  if (snake[0].x === food.x && snake[0].y === food.y) {
    tail += expansion;
    food = {
      x: Math.floor(Math.random() * size) + 1,
      y: Math.floor(Math.random() * size) + 1,
    };
    score++;
    scoreEl.textContent = `${score}`;
    if (score > 5) {
      speed++;
    }
  }
  overMove();
  onSnake();
}

// Update snake position
function updateSnake() {
  addTail();
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] };
  }
  snake[0].x += direction.x;
  snake[0].y += direction.y;
}

// Add snake tail, default is 0, when snake eat food, tail will addition
function addTail() {
  for (let i = 0; i < tail; i++) {
    snake.push({ ...snake[snake.length - 1] });
  }
  tail = 0;
}

// If snank outside game board then show game over
function overMove() {
  if (
    snake[0].x < 1 ||
    snake[0].x > size ||
    snake[0].y < 1 ||
    snake[0].y > size
  ) {
    gameOver();
  }
}

// If snack collidition itself then show game over
function onSnake() {
  snake.some((segment, index) => {
    if (index === 0) return;
    if (segment.x === snake[0].x && segment.y === snake[0].y) {
      gameOver();
    }
  });
}

// Show game over and restart
function gameOver() {
  window.cancelAnimationFrame(main);
  modal.classList.add("active");
  restart.addEventListener("click", () => {
    window.location = "/";
  });
}

// Draw function go on draw snake and food
function draw() {
  gameBoard.innerHTML = "";
  drawSnake();
  drawFood();
}

// Set snake in the game board
function drawSnake() {
  snake.forEach((segment) => {
    const snakeEl = document.createElement("div");
    snakeEl.style.gridRowStart = segment.y;
    snakeEl.style.gridColumnStart = segment.x;
    snakeEl.classList.add("snake");
    gameBoard.appendChild(snakeEl);
  });
}

// Set food in random position
function drawFood() {
  const foodEl = document.createElement("div");
  foodEl.style.gridRowStart = food.y;
  foodEl.style.gridColumnStart = food.x;
  foodEl.classList.add("food");
  gameBoard.appendChild(foodEl);
}

// Check listener key and set ket get snack direction
function checkDirection(e) {
  switch (e.key) {
    case "ArrowUp" || "Up":
      if (lastdirection.y != 0) break;
      direction = { x: 0, y: -1 };
      break;
    case "ArrowDown" || "Down":
      if (lastdirection.y != 0) break;
      direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft" || "Left":
      if (lastdirection.x != 0) break;
      direction = { x: -1, y: 0 };
      break;
    case "ArrowRight" || "Right":
      if (lastdirection.x != 0) break;
      direction = { x: 1, y: 0 };
      break;
  }
}

window.addEventListener("keydown", checkDirection);
