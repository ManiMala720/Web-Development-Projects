/* */
const converterForm = document.getElementById("converter-form");
const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const submitBtn = document.getElementById("submit-btn");
const result = document.getElementById("result");

window.addEventListener('load',fetchCurrencies);

converterForm.addEventListener('submit',convertCurrencies);

async function fetchCurrencies(){
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/usd");
  const data = await response.json();
  const currenyOptions = Object.keys(data.rates);
  currenyOptions.forEach(currency => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);
    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  })
}

async function convertCurrencies(e){
  e.preventDefault();
  const amount = parseFloat(amountInput.value);
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;
  if(amount<0){
    alert("Enter a valid amount");
    return;
  }
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`);
  const data = await response.json();
  const rate = data.rates[toCurrencyValue];
  const convertedCurrencyValue = (amount * rate).toFixed(2);
  result.textContent = `${amount} ${fromCurrencyValue} = ${convertedCurrencyValue} ${toCurrencyValue}`;
}

