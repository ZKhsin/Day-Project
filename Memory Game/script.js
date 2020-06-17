const startGame = document.getElementById("start-game");
const timeEl = document.getElementById("time");
const moveEl = document.getElementById("move");
const restart = document.getElementById("restart");
const cardsBoard = document.querySelector(".cards");
let cards = Array.from(document.querySelectorAll(".card"));
const modal = document.getElementById("modal");
const finalMove = document.getElementById("final-move");
const finalTime = document.getElementById("final-time");
const playAgain = document.getElementById("play-again");

let time = 0;
let move = 0;
let openCards = [];
let matchCards = [];
let timer;

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function initGame() {
  startGame.style.display = "none";
  modal.style.display = "none";

  openCards = [];
  matchCards = [];
  time = 0;
  move = 0;
  moveEl.innerHTML = move;

  clearInterval(timer);

  cards = shuffle(cards);

  for (let i = 0; i < cards.length; i++) {
    cardsBoard.innerHTML = "";
    [].forEach.call(cards, (card) => {
      cardsBoard.appendChild(card);
    });
    cards[i].classList.remove("show", "match");
  }

  updateTime();
}

function updateTime() {
  timer = setInterval(() => {
    time++;
    timeEl.innerHTML = `${time}s`;
  }, 1000);
}

function showCard() {
  this.classList.add("show");
}

function checkCard() {
  openCards.push(this);
  updateMove();
  if (openCards.length === 2) {
    if (openCards[0].dataset.type === openCards[1].dataset.type) {
      cardMatch();
      matchCards.push(openCards[0], openCards[1]);
    } else {
      cardUnmatch();
    }
  }
}

function updateMove() {
  move++;
  moveEl.innerHTML = move;
}

function cardMatch() {
  setTimeout(() => {
    openCards[0].classList.add("match");
    openCards[1].classList.add("match");

    openCards = [];
  }, 500);
}

function cardUnmatch() {
  setTimeout(() => {
    openCards[0].classList.remove("show");
    openCards[1].classList.remove("show");
    openCards = [];
  }, 500);
}

function overGame() {
  if (matchCards.length === cards.length) {
    clearInterval(timer);

    modal.style.display = "flex";
    finalTime.innerHTML = time;
    finalMove.innerHTML = move;

    playAgain.addEventListener("click", initGame);
  }
}

startGame.addEventListener("click", initGame);
restart.addEventListener("click", initGame);

cards.forEach((card) => {
  card.addEventListener("click", showCard);
  card.addEventListener("click", checkCard);
  card.addEventListener("click", overGame);
});
