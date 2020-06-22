const cards = document.getElementById("cards");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const cardIndex = document.getElementById("index");
const addBtn = document.getElementById("add");
const closeBtn = document.getElementById("close");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card-btn");
const clearBtn = document.getElementById("clear");
const addCard = document.getElementById("add-card");

let currentActiveCard = 0;

const cardsEl = [];
const cardsData = getCardsData();

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
   <div class="inner-card">
    <div class="inner-card-front">
      <p>
        ${data.question}
      </p>
    </div>
    <div class="inner-card-back">
      <p>
        ${data.answer}
      </p>
    </div>
   </div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show"));

  cardsEl.push(card);
  cards.appendChild(card);

  updateCurrentText();
}

function updateCurrentText() {
  cardIndex.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard = currentActiveCard + 1;
  if (currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard = currentActiveCard - 1;
  if (currentActiveCard < 0) {
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

addBtn.addEventListener("click", () => addCard.classList.add("show"));
closeBtn.addEventListener("click", () => addCard.classList.remove("show"));

addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = { question: question, answer: answer };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addCard.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cards.innerHTML = "";
  window.location.reload();
});
