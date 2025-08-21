const BASE_URL = "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=ee7f3bc74e3742c28aeabde8ccf08906";
const dropdowns = document.querySelectorAll(".dropdown select");

// for(code in countryList) {
//     console.log(code,countryList[code]);
// }

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Add or create a note element in your HTML with class "note"
const note = document.querySelector(".note");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update note when from currency changes
fromCurr.addEventListener("change", () => {
    if (fromCurr.value !== "USD") {
        note.innerText = "Note: Base currency remains USD due to API subscription limitations.";
    } else {
        note.innerText = "";
    }
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}&base=${fromCurr.value.toLowerCase()}&symbols=${toCurr.value.toLowerCase()}`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data.rates[toCurr.value.toUpperCase()];

    let finalAmount = amountValue * rate;

    msg.innerText = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    
    if (fromCurr.value !== "USD") {
        note.innerText = "Note: Base currency remains USD due to API subscription limitations.";
    } else {
        note.innerText = "";
    }
};

const updateFlag = (element) => {
    currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});

// Trigger button click on Enter key
const amountInput = document.querySelector(".amount input");

amountInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        btn.click(); // Trigger button action
    }
});
