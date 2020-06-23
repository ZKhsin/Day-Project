const inputNote = document.getElementById("input-note");
const noteColor = document.querySelectorAll(".color-box div");
const addBtn = document.getElementById("add-btn");
const removeBtn = document.getElementById("remove-btn");
const notes = document.getElementById("notes");

function setColor(e) {
  if (e.target.id === "black" || e.target.id === "brown") {
    inputNote.classList.add("light");
  } else {
    inputNote.classList.remove("light");
  }
  inputNote.style.backgroundColor = `${e.target.dataset.color}`;
}

function getTime() {
  const date = new Date();
  return `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function addNote() {
  const now = getTime();

  if (inputNote.value === "") {
    alert("Please enter note content");
  } else {
    const note = document.createElement("div");
    note.classList.add("note");
    note.style.backgroundColor = inputNote.style.backgroundColor;
    if (inputNote.className.includes("light")) {
      note.style.color = "#bcaaa4";
    }
    note.innerHTML = `
      <div class="time">${now}</div>
      <p>${inputNote.value}</p>
    `;

    notes.appendChild(note);
    inputNote.value = "";
  }
}

function removeNote() {
  notes.innerHTML = "";
}

noteColor.forEach((color) => color.addEventListener("click", setColor));
addBtn.addEventListener("click", addNote);
removeBtn.addEventListener("click", removeNote);
