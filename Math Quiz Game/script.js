const difficulty = document.querySelector("#difficulty");
const scoreEl = document.querySelector(".score span");
const wrongEl = document.querySelector(".wrong span");
const numOne = document.querySelector(".num-1");
const numTwo = document.querySelector(".num-2");
const operationEl = document.querySelector(".operation p");
const answer = document.querySelector("#answer");
const checkBtn = document.querySelector(".check button");

let score = 0;
let wrong = 0;
const operator = ["+", "-", "×", "÷"];

function getRandomNum() {
  if (difficulty.value === "easy") {
    return Math.floor(Math.random() * 9);
  } else if (difficulty.value === "medium") {
    return Math.floor(Math.random() * 99);
  } else {
    return Math.floor(Math.random() * 999);
  }
}

function getRandomOpertor() {
  return operator[Math.floor(Math.random() * operator.length)];
}

function compute() {
  let computation;
  const one = +numOne.textContent;
  const two = +numTwo.textContent;
  switch (operationEl.textContent) {
    case "+":
      computation = one + two;
      break;
    case "-":
      computation = one - two;
      break;
    case "×":
      computation = one * two;
      break;
    case "÷":
      computation = one / two;
      break;
  }
  console.log(computation);
  return computation;
}

function setScore() {
  if (answer.parentElement.className.includes("wrong")) {
    wrong++;
    wrongEl.textContent = `${wrong}`;
  } else {
    score++;
    scoreEl.textContent = `${score}`;
  }
}

function setQuizArea() {
  numOne.textContent = `${getRandomNum()}`;
  operationEl.textContent = `${getRandomOpertor()}`;
  numTwo.textContent = `${getRandomNum()}`;
}

function checkAnswer() {
  if (+answer.value === compute()) {
    answer.parentElement.classList.remove("wrong");
    answer.value = "";
    setScore();
    setQuizArea();
  } else {
    answer.parentElement.classList.add("wrong");
    setScore();
  }
}

answer.focus();
setQuizArea();
difficulty.addEventListener("change", setQuizArea);
checkBtn.addEventListener("click", checkAnswer);
window.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    checkAnswer();
  }
});
