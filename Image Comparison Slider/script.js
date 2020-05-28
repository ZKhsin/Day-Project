const progress = document.querySelector(".range");
const blurImage = document.querySelector(".blur-image");
const fillImage = document.querySelector(".fill-image");

function slider() {
  blurImage.style.width = `${+this.value}%`;
  fillImage.style.width = `${+this.value}%`;
}

progress.addEventListener("mousemove", slider);
progress.addEventListener("change", slider);
