const moon = document.getElementById("moon");
const title = document.querySelector("section h2");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const button = document.querySelector("button");

window.addEventListener("scroll", () => {
  console.log(window.scrollY);
  const value = window.scrollY;
  moon.style.left = `${-value * 0.3}px`;
  title.style.top = `${value * 1}px`;

  if (window.scrollY > 580) {
    first.classList.add("active");
  } else {
    first.classList.remove("active");
  }

  if (window.scrollY > 920) {
    second.classList.add("active");
  } else {
    second.classList.remove("active");
  }
});

button.addEventListener("click", () => {
  document.documentElement.classList.toggle("active");
});
