const wrap = document.querySelector(".wrap");
const file = document.querySelector("#file");
const cancel = document.querySelector("#cancel");
const chooseFile = document.querySelector("#choose-file");
const fileName = document.querySelector(".file-name");
const img = document.querySelector("img");
const filterBar = document.querySelector(".filter-bar");
const filters = document.querySelectorAll(".filter-bar input");

let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_']+$/;

function fileActive() {
  file.click();
}

function getPhoto(e) {
  const files = e.target.files[0];
  if (files) {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      img.src = result;
      wrap.classList.add("active");
    };

    cancel.addEventListener("click", () => {
      img.src = "";
      wrap.classList.remove("active");
      removeFilter();
    });

    reader.readAsDataURL(files);
  }

  if (e.target.value) {
    let value = e.target.value.match(regExp);
    fileName.textContent = value;
  }

  showFilter();
}

function updatePhoto() {
  const unit = this.dataset.size || "";
  img.style.setProperty(`--${this.name}`, `${this.value}${unit}`);
}

function showFilter() {
  filterBar.style.display = "block";

  filters.forEach((filter) => filter.addEventListener("change", updatePhoto));
  filters.forEach((filter) =>
    filter.addEventListener("mousemove", updatePhoto)
  );
}

function removeFilter() {
  filterBar.style.display = "none";
}

file.addEventListener("change", getPhoto);

chooseFile.addEventListener("click", fileActive);
