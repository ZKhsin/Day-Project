const cursor = document.querySelector(".cursor");
const container = document.querySelector(".container");
const button = document.querySelector(".cursor button");
const root = document.documentElement;

window.onmousemove = (e) => {
  const x = e.clientX;
  const y = e.clientY;
  root.style.setProperty("--x", `${x}px`);
  root.style.setProperty("--y", `${y}px`);
};

cursor.addEventListener("click", () => {
  cursor.style.clipPath = `circle(100px at var(--x) var(--y)`;
  setTimeout(() => {
    cursor.style.clipPath = `circle(20px at var(--x) var(--y)`;
  }, 3000);
});

cursor.addEventListener("dblclick", () => {
  cursor.style.clipPath = `circle(3000px at var(--x) var(--y)`;
  cursor.style.transition = `5s`;
  setTimeout(() => {
    cursor.style.clipPath = `circle(20px at var(--x) var(--y)`;
    cursor.style.transition = `0s`;
  }, 3000);
});

button.addEventListener("click", () => {
  window.location.reload();
});
