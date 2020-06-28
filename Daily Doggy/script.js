const imgHref = document.getElementById("img-href");
const dogImg = document.getElementById("dog-img");
const showBtn = document.getElementById("show-dog");

function showImage() {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((data) => {
      imgHref.classList.add("show");
      imgHref.href = `${data.message}`;
      dogImg.src = `${data.message}`;
    });
}

showBtn.addEventListener("click", showImage);
