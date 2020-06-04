const dec = document.querySelector("#dec");
const bin = document.querySelector("#bin");
const oct = document.querySelector("#oct");
const hex = document.querySelector("#hex");
const button = document.querySelector("button");
const convertor = document.querySelector(".convertor");

convertor.style.visibility = "hidden";

function convertNumber() {
  if (dec.value === "") return;
  const value = +dec.value;
  bin.textContent = `${value.toString(2)}`;
  oct.textContent = `${value.toString(8)}`;
  hex.textContent = `${value.toString(16)}`;
  convertor.style.visibility = "visible";
}

button.addEventListener("click", () => {
  convertNumber();
  dec.addEventListener("keyup", () => {
    if (dec.value === "") {
      window.location.reload();
    } else {
      convertNumber();
    }
  });
});
