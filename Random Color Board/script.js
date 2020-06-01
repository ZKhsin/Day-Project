const container = document.querySelector(".container");
const title = document.querySelector("h1");
const span = document.querySelector("h1 span");

const square = 800;

function getRandomColor() {
  let color = "#";
  let symbols = "0123456789ABCDEF";

  for (let i = 0; i < 6; i++) {
    color = color + symbols[Math.floor(Math.random() * 16)];
  }

  if (color != "#000000") {
    return color;
  }
}

function setRandomColor(div) {
  const color = getRandomColor();
  div.style.backgroundColor = color;
  div.style.boxShadow = `0 0 2px ${color}`;
}

function removeRandomColor(div) {
  div.style.backgroundColor = "#000";
  div.style.boxShadow = `0 0 2px #000`;
}

for (let i = 0; i < square; i++) {
  const div = document.createElement("div");

  div.addEventListener("mouseover", () => setRandomColor(div));
  div.addEventListener("mouseout", () => removeRandomColor(div));

  container.appendChild(div);
}

title.addEventListener(
  "mousemove",
  () => (title.style.color = getRandomColor())
);
title.addEventListener("mouseout", () => (title.style.color = "#000"));

setInterval(() => {
  span.style.color = getRandomColor();
}, 1000);
