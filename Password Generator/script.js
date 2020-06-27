const result = document.getElementById("result");
const length = document.getElementById("length");
const lengthValue = document.querySelector(".setting small");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const generate = document.getElementById("generate");
const copy = document.getElementById("copy");

const randomFunction = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function generatePassword(length, upper, lower, number, symbol) {
  let generatedPassword = "";

  const typesCount = upper + lower + number + symbol;
  const typesArray = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i++) {
    const random = Math.floor(Math.random() * typesArray.length);
    generatedPassword += randomFunction[Object.keys(typesArray[random])[0]]();
  }

  const finalPassword = generatedPassword;
  return finalPassword;
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "~!@#$%^&*-(){}[]=+<>/,.:;|";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function changeValue() {
  lengthValue.innerText = length.value;
}

generate.addEventListener("click", () => {
  const getLength = +length.value;
  const getUpper = uppercase.checked;
  const getLowr = lowercase.checked;
  const getNumber = numbers.checked;
  const getSymbol = symbols.checked;

  result.innerText = generatePassword(
    getLength,
    getUpper,
    getLowr,
    getNumber,
    getSymbol
  );
});

copy.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = result.innerText;
  if (!password) return;

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password already copied");
});

length.addEventListener("change", changeValue);
length.addEventListener("mousemove", changeValue);
