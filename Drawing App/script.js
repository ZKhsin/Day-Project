const ctxColor = document.getElementById("color");
const ctxSize = document.getElementById("size");
const ctxSizeValue = document.getElementById("size-value");
const canvas = document.getElementById("canvas");
const erase = document.getElementById("erase");
const save = document.getElementById("save");
const download = document.getElementById("download");
const reset = document.getElementById("reset");

const ctx = canvas.getContext("2d");
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.strokeStyle = ctxColor.value;
ctx.lineWidth = ctxSize.value;

let isDrawing = false;
let eraser = false;
let init = {
  X: 0,
  Y: 0,
};

if (localStorage.getItem !== null) {
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
  };
  img.src = localStorage.getItem("image");
}

function setColor() {
  ctx.strokeStyle = ctxColor.value;
}

function setSize() {
  ctx.lineWidth = ctxSize.value;
  ctxSizeValue.innerHTML = ctxSize.value;
}

function draw(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(init.X, init.Y);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [init.X, init.Y] = [e.offsetX, e.offsetY];
}

function eraseCanvas() {
  eraser = !eraser;
  if (eraser === true) {
    ctx.strokeStyle = "white";
    erase.textContent = "Pencil";
    erase.classList.add("pencil");
  } else {
    ctx.strokeStyle = ctxColor.value;
    erase.textContent = "Erase";
    erase.classList.remove("pencil");
  }
}

function saveCanvas() {
  localStorage.setItem("image", canvas.toDataURL());
}

function downCanvas() {
  const link = document.createElement("a");
  link.download = "image.png";
  link.href = document.getElementById("canvas").toDataURL();
  link.click();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  localStorage.setItem("image", "");
}

ctxColor.addEventListener("change", setColor);
ctxSize.addEventListener("change", setSize);
ctxSize.addEventListener("mousemove", setSize);

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [init.X, init.Y] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

erase.addEventListener("click", eraseCanvas);
save.addEventListener("click", saveCanvas);
download.addEventListener("click", downCanvas);
reset.addEventListener("click", clearCanvas);
