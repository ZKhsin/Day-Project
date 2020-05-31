const greet = document.querySelector(".date h1");
const day = document.querySelector(".day");
const week = document.querySelector(".week");
const hour = document.querySelector(".hours");
const minute = document.querySelector(".minutes");
const second = document.querySelector(".seconds");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function setGreet() {
  let date = new Date();
  let greetTime = date.getHours();
  let greetYear = date.getFullYear();
  let greetMonth = date.getMonth();
  let greetDay = date.getDate();
  let greetWeek = date.getDay();

  if (greetTime < 12) {
    document.body.style.backgroundImage = "url('./img/morning.jpg')";
    greet.textContent = "Good Morning";
  } else if (greetTime < 18) {
    document.body.style.backgroundImage = "url('./img/afternoon.jpg')";
    greet.textContent = "Good Afternoon";
  } else {
    document.body.style.backgroundImage = "url('./img/evening.jpg')";
    greet.textContent = "Good Evening";
  }

  day.innerHTML = `${greetYear} ${months[greetMonth]} ${greetDay}`;
  week.innerHTML = `${weeks[greetWeek]}`;
}

setInterval(() => {
  let time = new Date();
  let setHour = time.getHours() * 30;
  let setMin = time.getMinutes() * 6;
  let setSec = time.getSeconds() * 6;
  hour.style.transform = `rotateZ(${setHour + setMin / 12}deg)`;
  second.style.transform = `rotateZ(${setSec}deg)`;
  minute.style.transform = `rotateZ(${setMin}deg)`;
});

setGreet();
