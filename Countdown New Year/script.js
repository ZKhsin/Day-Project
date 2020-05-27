const year = document.getElementById("year");
const countdown = document.getElementsByClassName("countdown");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const currentYear = new Date().getFullYear();
const nextYear = new Date(`January 01 ${currentYear + 1}`);

year.innerHTML = `
${Math.round(currentYear / 100)}<span>${(currentYear % 100) + 1}</span>
`;

function checkNumber(num) {
  return num < 10 ? `0${num}` : num;
}

function countdownTime() {
  const today = new Date();
  const diff = nextYear - today;
  const day = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hour = Math.floor(diff / 1000 / 60 / 60) % 24;
  const minute = Math.floor(diff / 1000 / 60) % 60;
  const second = Math.floor(diff / 1000) % 60;

  days.innerHTML = checkNumber(day);
  hours.innerHTML = checkNumber(hour);
  minutes.innerHTML = checkNumber(minute);
  seconds.innerHTML = checkNumber(second);
}

setInterval(countdownTime, 1000);
