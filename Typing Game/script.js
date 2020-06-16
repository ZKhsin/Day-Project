const infoBtn = document.getElementById("show-info");
const info = document.getElementById("info");
const closeBtn = document.getElementById("close");
const settingsBtn = document.getElementById("show-settings");
const settings = document.getElementById("settings");
const setting = document.getElementById("setting");
const selectDifficulty = document.getElementById("difficulty");
const word = document.getElementById("word");
const text = document.getElementById("text");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const gameOverEl = document.getElementById("game-over");
const result = document.getElementById("result");
const restart = document.getElementById("restart");

text.focus();

let randomWord;
let time = 30;
let score = 0;

let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

selectDifficulty.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

const intervalTime = setInterval(updateTime, 1000);

function getWord() {
  fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "a33398f128msh6d4fc5c00f285b1p10511cjsnc14de6b757f8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      randomWord = data.word;
      word.innerHTML = randomWord;
    });
}

function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(intervalTime);
    gameOver();
  }
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

function gameOver() {
  result.innerHTML = score;
  gameOverEl.style.display = "flex";

  restart.addEventListener("click", () => {
    location.reload();
  });
}

function showInfo() {
  info.classList.add("show");
}

function closeInfo() {
  info.classList.remove("show");
}

function toggleSettings() {
  settings.classList.toggle("show");
}

getWord();

infoBtn.addEventListener("click", showInfo);
closeBtn.addEventListener("click", closeInfo);
settingsBtn.addEventListener("click", toggleSettings);

selectDifficulty.addEventListener("change", (e) => {
  location.reload();
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

text.addEventListener("input", (e) => {
  const inputValue = e.target.value;
  if (inputValue === randomWord) {
    getWord();
    updateScore();

    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 4;
    }

    updateTime();
  }
});
