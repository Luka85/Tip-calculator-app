const inputBill = document.querySelector("#bill");
const percentageAll = document.querySelectorAll(".btn_percentage");
const customPercentage = document.querySelector("#custom");
const numPeople = document.querySelector("#number");
const total = document.querySelector(".result_total_amount");
const tipAmount = document.querySelector(".result_tip_amount");
const resetBtn = document.querySelector(".btn_reset");
const alert = document.createElement("div");
let savedValue;
let customValue;

//as soon as the form loads focus only on inputBill, all other functions are disabled
inputBill.focus();
for (let percentage of percentageAll) {
    percentage.disabled = true;
}
numPeople.disabled = true;
resetBtn.disabled = true;
customPercentage.disabled = true;

//first fill out inputBill, once the input is filled up, buttons are enabled, once the button is clicked...
inputBill.addEventListener("input", isEmptyInputBill);
function isEmptyInputBill() {
    if (inputBill.value == "" || inputBill.value == 0) {
        alert.classList.add("alert");
        alert.textContent = "Can't be zero or blank"
        alert.style.color = "hsl(0, 67%, 45%)";
        inputBill.style.borderColor = "hsl(0, 67%, 45%)";
        numPeople.style.borderColor = "grey";
        inputBill.insertAdjacentElement("beforebegin", alert);
        inputBill.value = "";
        inputBill.focus();
        for (let percentage of percentageAll) {
            percentage.disabled = true;
        }
        numPeople.disabled = true;
        customPercentage.disabled = true;
        resetBtn.disabled = true;
        total.innerText = "$0.00";
        tipAmount.innerText = "$0.00";
        return;
    } else {
        for (let percentage of percentageAll) {
            percentage.disabled = false;
        }
        inputBill.style.borderColor = "hsl(172, 67%, 45%)";
        customPercentage.disabled = false;
        resetBtn.disabled = false;
        alert.classList.remove("alert");
        alert.textContent = "";
        getResult();
        if (numPeople.value < 1) {
            total.innerText = "$0.00";
            tipAmount.innerText = "$0.00";
        }
        inputBill.addEventListener("click", function () {
            inputBill.style.borderColor = "hsl(172, 67%, 45%)";
            inputBill.select();
        })
        return;
    }
}

//... this function runs, enables input numPeople and runs function isEmptyInputNumPeople
for (let percentage of percentageAll) {
    percentage.addEventListener("click", toggleBtn);
}

// this runs when we click un custom percentage input
customPercentage.addEventListener("click", function () {
    for (let percentage of percentageAll) {
        percentage.classList.remove("toggle");
    }
    customPercentage.value = "";
    customPercentage.focus();
    numPeople.disabled = false;
    customPercentage.addEventListener("input", customPerc);
})

// function that validate custom percentage input
function customPerc() {
    let max = 100;
    let min = 0;
    if (this.value <= 100 && this.value > 0) {
        customValue = Number(this.value);
        getResultCustom();
    } else if (this.value > max || this.value <= min) {
        customPercentage.value = "";
        this.select();
    }
}

// function that toggle buttons
function toggleBtn() {
    for (let percentage of percentageAll) {
        percentage.classList.remove("toggle");
        numPeople.disabled = false;
        numPeople.focus();
        numPeople.addEventListener("input", isEmptyInputNumPeople);
        savedValue = this.value;
        customPercentage.value = "";
        getResult();
        if (numPeople.value < 1) {
            total.innerText = "$0.00";
            tipAmount.innerText = "$0.00";
        }
    }
    this.classList.add("toggle");
}

// function if the input Number of people is empty
function isEmptyInputNumPeople() {
    if (numPeople.value === "" || numPeople.value == 0 || numPeople.length <= 0) {
        alert.classList.add("alert");
        alert.textContent = "Can't be zero"
        alert.style.color = "hsl(0, 67%, 45%)";
        numPeople.style.borderColor = "hsl(0, 67%, 45%)";
        numPeople.insertAdjacentElement("beforebegin", alert);
        numPeople.value = "";
        numPeople.focus();
        total.innerText = "$0.00";
        tipAmount.innerText = "$0.00";
        return;
    } else {
        numPeople.style.borderColor = "hsl(172, 67%, 45%)";
        alert.classList.remove("alert");
        alert.textContent = "";
        getResult();
    }
}

numPeople.addEventListener("click", function () {
    numPeople.select();
    numPeople.addEventListener("input", getResultCustom)
})

// get the result from Percentage buttons
function getResult() {
    let totalPerson = ((Number(inputBill.value) + ((inputBill.value * Number(savedValue)) / 100)) / numPeople.value);
    total.innerText = `$${(totalPerson.toFixed(2))}`;
    let totalTipAmount = ((inputBill.value * savedValue) / 100) / numPeople.value;
    tipAmount.innerText = `$${(totalTipAmount.toFixed(2))}`;
    if (total.value = 0) {
        total.innerText = "$0.00";
    } else if (tipAmount.value = 0) {
        tipAmount.innerText = "$0.00";
    }
}

// get the result from Custom input 
function getResultCustom() {
    let totalPersonCustom = ((Number(inputBill.value) + ((inputBill.value * customValue) / 100)) / Number(numPeople.value));
    total.innerText = `$${(Number(totalPersonCustom.toFixed(2)))}`;

    let totalTipAmountCustom = ((inputBill.value * customValue) / 100) / Number(numPeople.value);
    tipAmount.innerText = `$${(Number(totalTipAmountCustom.toFixed(2)))}`;
    if (numPeople.value < 1) {
        total.innerText = "$0.00";
        tipAmount.innerText = "$0.00";
    }
}

//reset all
resetBtn.addEventListener("click", reset);

function reset() {
    inputBill.value = "";
    inputBill.focus();
    for (let percentage of percentageAll) {
        percentage.classList.remove("toggle");
        percentage.disabled = true;
    }
    customPercentage.disabled = true;
    numPeople.disabled = true;
    numPeople.value = "";
    total.textContent = "$0.00";
    tipAmount.textContent = "$0.00";
}



