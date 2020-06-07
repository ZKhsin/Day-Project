const balance = document.querySelector(".balance-value");
const incomeTotal = document.querySelector(".income-total-value");
const expenseTotal = document.querySelector(".expense-total-value");
const income = document.querySelector(".income");
const expense = document.querySelector(".expense");
const history = document.querySelector(".history");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const historyEl = document.querySelector("#history");
const incomeItem = document.querySelector("#income .list");
const expenseItem = document.querySelector("#expense .list");
const historyItem = document.querySelector("#history .list");
const incomeEvent = document.querySelector("#income-event");
const incomeAmount = document.querySelector("#income-amount");
const expenseEvent = document.querySelector("#expense-event");
const expenseAmount = document.querySelector("#expense-amount");
const addIncome = document.querySelector("#add-income");
const addExpense = document.querySelector("#add-expense");
const chart = document.querySelector(".chart");

// Draw chart
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 200;
canvas.height = 200;
ctx.lineWidth = 15;
const radius = 80;
chart.appendChild(canvas);

function drawChart(color, ratio, anticlockwise) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    radius,
    0,
    ratio * 2 * Math.PI,
    anticlockwise
  );
  ctx.stroke();
}

function updateChart(income, expense) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let ratio = income / (income + expense);

  drawChart("#fff", -ratio, true);
  drawChart("#ff1744", 1 - ratio, false);
}

// Set UI
const date = new Date();
const day = `${date.getMonth() + 1}/${date.getDate()}`;

const localStorageItems = JSON.parse(localStorage.getItem("items"));
let items = localStorage.getItem("items") !== null ? localStorageItems : [];

//  Get random ID
function getID() {
  return Math.floor(Math.random() * 100000);
}

// Push new item to items
function addItem(item, event, amount) {
  if (!event.value || !amount.value) return;

  const pushItem = {
    date: day,
    id: getID(),
    type: item.parentElement.id,
    event: event.value,
    amount: +amount.value,
  };

  if (pushItem.type === "expense") {
    pushItem.amount = -+amount.value;
  }

  items.push(pushItem);

  updateTotal();
  updateBoard(pushItem);
  updateHistory(pushItem);
  updateLocalStorage();

  event.value = "";
  amount.value = "";
}

// Update total board
function updateTotal() {
  const amounts = items.map((amount) => amount.amount);
  const totalValue = amounts.reduce((acc, item) => (acc += item), 0);

  const incomeValue = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);

  const expenseValue =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1;

  balance.innerHTML = `${totalValue}`;
  incomeTotal.innerHTML = `${incomeValue}`;
  expenseTotal.innerHTML = `${expenseValue}`;

  updateChart(incomeValue, expenseValue);
}

// Update income and expense board
function updateBoard(item) {
  const newItem = document.createElement("li");
  newItem.innerHTML = `
  <span>${day}</span>${item.event}: $${
    item.amount < 0 ? item.amount * -1 : item.amount
  } <i class="fas fa-trash-alt delete" onclick="removeItem(${item.id})"></i>`;
  if (item.type === "expense") {
    expenseItem.appendChild(newItem);
  } else {
    incomeItem.appendChild(newItem);
  }
}

// Update history board
function updateHistory(item) {
  const newItem = document.createElement("li");
  if (item.type === "expense") {
    newItem.classList.add("red");
  }
  newItem.innerHTML = `
  <span>${day}</span>${item.event}: $${
    item.amount < 0 ? item.amount * -1 : item.amount
  }`;

  historyItem.appendChild(newItem);
}

// Remove item
function removeItem(id) {
  items = items.filter((item) => item.id !== id);

  updateLocalStorage();

  init();
}

// Update localstorage
function updateLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items));
}

// Init app
function init() {
  incomeItem.innerHTML = "";
  expenseItem.innerHTML = "";
  historyItem.innerHTML = "";

  items.forEach((item) => updateBoard(item));
  items.forEach((item) => updateHistory(item));
  updateTotal();
}

// Set toggle board
function showBoard(title, board) {
  title.classList.add("active");
  board.classList.remove("hide");
}

function hideBoard(titles, boards) {
  titles.forEach((title) => title.classList.remove("active"));
  boards.forEach((board) => board.classList.add("hide"));
}

init();

// Listener add button click
addIncome.addEventListener("click", () => {
  addItem(incomeItem, incomeEvent, incomeAmount);
});

addExpense.addEventListener("click", () => {
  addItem(expenseItem, expenseEvent, expenseAmount);
});

// Listener toggle board title click
income.addEventListener("click", () => {
  showBoard(income, incomeEl);
  hideBoard([expense, history], [expenseEl, historyEl]);
});

expense.addEventListener("click", () => {
  showBoard(expense, expenseEl);
  hideBoard([income, history], [incomeEl, historyEl]);
});

history.addEventListener("click", () => {
  showBoard(history, historyEl);
  hideBoard([expense, income], [expenseEl, incomeEl]);
});
