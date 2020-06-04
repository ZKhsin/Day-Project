const container = document.querySelector(".container");

function getRandomNum() {
  return Math.floor(Math.random() * 100);
}

function getRandomFloat() {
  return Math.random();
}

function createBubble() {
  const size = getRandomNum();
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${getRandomNum()}%`;
  bubble.style.opacity = `${getRandomFloat()}`;
  container.appendChild(bubble);

  bubble.addEventListener("mouseover", () => {
    bubble.style.opacity = "1";
    bubble.style.backgroundColor = "#00f";
  });

  setTimeout(() => {
    bubble.remove();
  }, 5000);
}

setInterval(createBubble, 300);
