const progress = document.querySelector(".range");
const blurImage = document.querySelector(".blur-night-image");
const fillImage = document.querySelector(".night-image");

function slider() {
  blurImage.style.left = `${+this.value}%`;
  if (this.value >= 32) {
    fillImage.style.left = `${(+this.value - 32) * 1.5}%`;
  }
}

progress.addEventListener("mousemove", slider);
progress.addEventListener("change", slider);
