const boxes = document.getElementById("boxes");
const modal = document.getElementById("modal");
const switchEl = document.getElementById("switch-time");
const playAgain = document.getElementById("play-again");

let switchBox = [];
let matchBox = [];
let switchTime = 0;
const defaultBox = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function checkMatchBox(box) {
  box.forEach((b) => {
    matchBox.push(+b.id);
  });

  const win = checkWin(matchBox, defaultBox);

  if (win === true) {
    setTimeout(() => {
      winGame();
    }, 2000);
  }

  matchBox = [];
}

function checkWin(matchBox, defaultBox) {
  for (let i = 0; i < matchBox.length; i++) {
    if (matchBox[i] !== defaultBox[i]) {
      return false;
    }
  }
  return true;
}

function winGame() {
  modal.style.display = "flex";
  switchEl.innerHTML = switchTime;
  playAgain.addEventListener("click", () => {
    window.location.reload();
  });
}

function checkBoxSwitch() {
  switchBox.push(this);
  this.classList.add("active");
  switchTime++;

  if (switchBox.length === 2) {
    const first = {
      position: switchBox[0].style.backgroundPosition,
      id: switchBox[0].id,
    };

    const second = {
      positon: switchBox[1].style.backgroundPosition,
      id: switchBox[1].id,
    };

    switchBox[0].style.backgroundPosition = second.positon;
    switchBox[0].id = second.id;
    switchBox[1].style.backgroundPosition = first.position;
    switchBox[1].id = first.id;

    setTimeout(() => {
      switchBox[0].classList.remove("active");
      switchBox[1].classList.remove("active");
      switchBox = [];
    }, 500);
  }
}

function startGame(box) {
  box.forEach((b) => {
    b.addEventListener("click", checkBoxSwitch);
    b.addEventListener("click", () => {
      checkMatchBox(box);
    });
  });
}

function suffle(array) {
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

function suffleBox(box) {
  box = suffle(box);

  for (let i = 0; i < box.length; i++) {
    boxes.innerHTML = "";
    [].forEach.call(box, (b) => {
      boxes.appendChild(b);
    });
  }

  startGame(box);
}

function createBox() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.backgroundPosition = `${-j * 150}px ${-i * 150}px`;
      boxes.appendChild(box);
    }
  }

  const box = document.querySelectorAll(".box");
  box.forEach((b, i) => {
    b.id = `${i + 1}`;
  });

  setTimeout(() => {
    suffleBox(Array.from(box));
  }, 5000);
}

createBox();
