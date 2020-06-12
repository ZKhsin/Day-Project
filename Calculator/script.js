const numberBtn = document.querySelectorAll("[data-number]");
const operationBtn = document.querySelectorAll("[data-operation]");
const deleteBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-clear]");
const equalBtn = document.querySelector("[data-equal]");
const previous = document.querySelector(".previous");
const current = document.querySelector(".current");

let previousValue = "";
let currentValue = "";
let operationValue = undefined;

function appendNumber(number) {
  if (number === "." && currentValue.includes(".")) return;
  currentValue = `${currentValue.toString()}${number.toString()}`;
}

function appendOperation(operation) {
  if (currentValue === "") return;
  if (previousValue !== "") {
    compute();
  }
  previousValue = currentValue;
  operationValue = operation;
  currentValue = "";
}

function clearDisplay() {
  previousValue = "";
  currentValue = "";
  operationValue = undefined;
}

function deleteDisplay() {
  currentValue = currentValue.toString().slice(0, -1);
}

function compute() {
  let computation;
  const prev = parseFloat(previousValue);
  const cur = parseFloat(currentValue);
  if (isNaN(prev) || isNaN(cur)) return;
  switch (operationValue) {
    case "+":
      computation = prev + cur;
      break;
    case "-":
      computation = prev - cur;
      break;
    case "×":
      computation = prev * cur;
      break;
    case "÷":
      computation = prev / cur;
      break;
    default:
      return;
  }
  currentValue = computation;
  operationValue = undefined;
  previousValue = "";
}

function getDisplayNumber(number) {
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split(".")[0]);
  const decimalDigits = stringNumber.split(".")[1];
  let integerDisplay;
  if (isNaN(integerDigits)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

function updateDisplay() {
  if (operationValue != null) {
    previous.textContent = `${getDisplayNumber(
      previousValue
    )}${operationValue}`;
  } else {
    previous.textContent = "";
  }
  current.textContent = getDisplayNumber(currentValue);
}

numberBtn.forEach((number) => {
  number.addEventListener("click", () => {
    appendNumber(number.innerHTML);
    updateDisplay();
  });
});

operationBtn.forEach((operation) => {
  operation.addEventListener("click", () => {
    appendOperation(operation.innerHTML);
    updateDisplay();
  });
});

equalBtn.addEventListener("click", () => {
  compute();
  updateDisplay();
});

clearBtn.addEventListener("click", () => {
  clearDisplay();
  updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  deleteDisplay();
  updateDisplay();
});
