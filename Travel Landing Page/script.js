const body = document.querySelector("body");
const header = document.querySelector(".header");
const title = document.querySelector(".container .text h2");
const imgs = document.querySelectorAll("img");
const leftBtn = document.querySelector(".footer-left");
const rightBtn = document.querySelector(".footer-right");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const searchValue = document.querySelector("#search");
const search = document.querySelector("input[type='submit']");

const country = ["norway", "switzerland", "iceland"];
let index = 0;
let imgindex = 0;

function showPrev() {
  if (index == 0) {
    index = country.length - 1;
  } else {
    index--;
  }

  showCountry(index);
}

function showNext() {
  if (index == country.length - 1) {
    index = 0;
  } else {
    index++;
  }

  showCountry(index);
}

function showCountry(index) {
  body.style.background = `url(./img/${country[index]}.jpg) no-repeat center top / cover`;

  title.textContent = `${country[index]}`;

  imgs.forEach((img, i) => {
    img.src = `./img/${country[index]}-${i + 1}.jpg`;
    img.alt = `${country[index]}`;
  });

  header.classList.add("black");
  if (country[index] === "iceland") {
    header.classList.remove("black");
  }
}

function searchPlace() {
  window.open(`http://google.com/search?q=${searchValue.value}`);
  searchValue = "";
}

leftBtn.addEventListener("click", showPrev);
rightBtn.addEventListener("click", showNext);
left.addEventListener("click", showPrev);
right.addEventListener("click", showNext);
search.addEventListener("click", searchPlace);
