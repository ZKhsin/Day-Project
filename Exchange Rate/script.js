const currencyOne = document.getElementById("one");
const currencyTwo = document.getElementById("two");
const currencyTwoValue = document.getElementById("two-value");
const switchBtn = document.getElementById("switch-button");
const input = document.getElementById("input");
const output = document.getElementById("output");
const inputCurrency = document.getElementById("input-currency");
const outputCurrency = document.getElementById("output-currency");

function calculateRate() {
  const one = currencyOne.value;
  const two = currencyTwo.value;

  fetch(
    `https://prime.exchangerate-api.com/v5/f5d988d78c9f1318c8ff0ba3/latest/${one}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[two];
      currencyTwoValue.innerText = `${rate}`;

      output.value = input.value * rate;

      inputCurrency.innerText = one;
      outputCurrency.innerText = two;
    });
}

calculateRate();

currencyOne.addEventListener("change", calculateRate);
currencyTwo.addEventListener("change", calculateRate);
input.addEventListener("input", calculateRate);
switchBtn.addEventListener("click", () => {
  const temp = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = temp;
  calculateRate();
});
