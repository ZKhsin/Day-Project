const selection = document.querySelectorAll(".box i");
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const playerScoreEl = document.getElementById("player-score");
const computerScoreEl = document.getElementById("computer-score");
const restart = document.getElementById("restart");

let playerScore = 0;
let computerScore = 0;

function randomSelect() {
  const random = Math.floor(Math.random() * 9);
  if (random < 3) {
    return rock;
  } else if (random <= 6) {
    return paper;
  } else {
    return scissors;
  }
}

function checkWinner(player, computer) {
  if (player.id === computer.id) {
    return "tie";
  } else if (player.id === "rock") {
    if (computer.id === "scissors") {
      return "player";
    } else {
      return "computer";
    }
  } else if (player.id === "paper") {
    if (computer.id === "rock") {
      return "player";
    } else {
      return "computer";
    }
  } else {
    if (computer.id === "paper") {
      return "player";
    } else {
      return "computer";
    }
  }
}

function updateScore(winner) {
  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  } else {
    playerScore++;
    computerScore++;
  }

  playerScoreEl.innerHTML = playerScore;
  computerScoreEl.innerHTML = computerScore;
}

function removeEffect(player, computer) {
  setTimeout(() => {
    player.classList.remove("player");
    computer.classList.remove("tie", "computer");
  }, 1000);
}

function playGame(player) {
  player.classList.add("player");

  const computer = randomSelect();

  if (computer.className.includes("player")) {
    computer.classList.add("tie");
  } else {
    computer.classList.add("computer");
  }

  const winner = checkWinner(player, computer);
  updateScore(winner);
  removeEffect(player, computer);
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;
  playerScoreEl.innerHTML = playerScore;
  computerScoreEl.innerHTML = computerScore;
}

selection.forEach((select) => {
  select.addEventListener("click", () => {
    playGame(select);
  });
});

restart.addEventListener("click", restartGame);
