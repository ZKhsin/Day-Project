const slidePage = document.querySelector(".slide");
const submit = document.querySelector(".submit");
const step = document.querySelectorAll(".step");
const nextBtn = document.querySelectorAll(".next");
const prevBtn = document.querySelectorAll(".prev");

let current = 0;

function addCheck() {
  step[current].classList.add("active");
  current++;
}

function removeCheck() {
  step[current - 1].classList.remove("active");
  current--;
}

nextBtn.forEach((next, index) => {
  next.addEventListener("click", () => {
    slidePage.style.marginLeft = `-${(index + 1) * 25}%`;
    addCheck();
  });
});

prevBtn.forEach((prev, index) => {
  prev.addEventListener("click", () => {
    slidePage.style.marginLeft = `-${index * 25}%`;
    removeCheck();
  });
});

submit.addEventListener("click", () => {
  addCheck();
  setTimeout(() => {
    alert("Signed up success");
    location.reload();
  }, 800);
});
