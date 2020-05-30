const dateEl = document.querySelector(".date");
const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const daysEl = document.querySelector(".days");

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();

let selectYear = year;
let selectMonth = month;
let selectDay = day;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function updateWeek(year, month) {
  let week = new Date(year, month, 0).getDay();

  for (let i = week; i > 0; i--) {
    const empty = document.createElement("div");
    empty.classList.add("number");
    empty.textContent = "";
    daysEl.appendChild(empty);
  }
}

// Get previous month and set date element
function goPrevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  dateEl.innerHTML = `${months[month]} <span>${year}</span>`;
  setDates();
}

// Get next month and set date element
function goNextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  dateEl.innerHTML = `${months[month]} <span>${year}</span>`;
  setDates();
}

function setDates() {
  daysEl.innerHTML = `<div class="day">Mon</div>
        <div class="day">Tue</div>
        <div class="day">Wed</div>
        <div class="day">Thu</div>
        <div class="day">Fri</div>
        <div class="day">Sat</div>
        <div class="day">Sun</div>`;

  daysEl.classList.add("active");

  let amountDays = 31;
  if (month === 1) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      amountDays = 29;
    } else {
      amountDays = 28;
    }
  } else if (month === 3 || month === 5 || month === 8 || month === 10) {
    amountDays = 30;
  }

  updateWeek(year, month);

  for (let i = 1; i <= amountDays; i++) {
    const number = document.createElement("div");
    number.classList.add("number");
    number.textContent = i;

    if (selectYear === year && selectMonth === month && selectDay === i) {
      number.classList.add("active");
    }
    daysEl.appendChild(number);
  }
}

setDates();

// Set init date element(default: today)
dateEl.innerHTML = `${months[month]} <span>${year}</span>`;

// Elements listener
leftArrow.addEventListener("click", goPrevMonth);
rightArrow.addEventListener("click", goNextMonth);
