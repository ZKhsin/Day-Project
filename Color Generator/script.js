const color = document.querySelector("input");
const show = document.querySelector(".color-show");
const random = document.querySelector(".random");
const copy = document.querySelector(".copy");
const title = document.querySelector("h3");

color.focus();

function showColor() {
  show.style.backgroundColor = `#${color.value}`;
  title.style.backgroundColor = `#${color.value}`;
}

function changeBackground() {
  document.body.style.backgroundColor = `#${color.value}`;
}

function randomColor() {
  let setColor = `${Math.floor(Math.random() * 16777215).toString(16)}`;
  color.value = setColor;
  showColor();
  changeBackground();
}

function copyColor() {
  let value = color.value;
  let text = document.createElement("input");
  text.style.textTransform = "uppercase";
  text.setAttribute("value", `#${value}`);
  document.body.appendChild(text);
  text.select();
  document.execCommand("copy");
  text.remove();
  alert("Color is already copied");
}

color.addEventListener("change", changeBackground);
color.addEventListener("keyup", showColor);
random.addEventListener("click", randomColor);
copy.addEventListener("click", copyColor);
