const api = {
  key: "e51bf2b4e27d51fb5ed963792bf0c577",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".searchBox");
searchbox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode === 13) {
    getResults(searchbox.value);
    searchbox.value = "";
  }
}

async function getResults(cityName) {
  const res = await fetch(
    `${api.base}weather?q=${cityName}&units=metric&appid=${api.key}`
  );
  const data = await res.json();
  displayResults(data);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weatherEl = document.querySelector(".current .weather");
  weatherEl.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="${weather.weather[0].icon}">${weather.weather[0].main}`;

  let highlow = document.querySelector(".high-low");
  highlow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

function dateBuilder(now) {
  let months = [
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
