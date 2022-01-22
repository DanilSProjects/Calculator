// DOM selection of display, buttons
let displayText = "";
let currentOperation = [];
let isTheAnswer = false;
let display = document.querySelector("#display");
let calculatorButtons = document.querySelectorAll(".calculator-button");
calculatorButtons.forEach((button) => {
    button.addEventListener('click', updateDisplay)
})

// Function to update display + operate if '=' is pressed
function updateDisplay(e) {
    let buttonEntered = e.target.textContent;

    if (buttonEntered === "=") {
        currentOperation.push(Number(displayText));
        console.log(currentOperation);
        displayText = operate(currentOperation[0], currentOperation[2], currentOperation[1]);
        display.textContent = displayText;
        currentOperation = [];
        isTheAnswer = true;
    } else if (/[+\-*\/]/.test(buttonEntered)) {
        currentOperation.push(Number(displayText));
        displayText = buttonEntered;
        display.textContent = displayText;
        currentOperation.push(displayText);
        console.log(currentOperation);
        displayText = "";
    } else {
        if (isTheAnswer === true) {
            displayText = "";
        }
        isTheAnswer = false;
        displayText += buttonEntered;
        display.textContent = displayText;
    }

    
}

// Main operate function -> takes in operator and 2 numbers
function operate(first, second, operator) {
    switch (operator) {
        case "+":
            return add(first, second);
        case "-":
            return subtract(first, second);
        case "*":
            return multiply(first, second);
        case "/":
            return divide(first, second);
        default:
            return "Error"
    }
}

// Basic operations
function add(first, second) {
    let output = first + second;
    return output;
}

function subtract(first, second) {
    let output = first - second;
    return output;
}

function multiply(first, second) {
    let output = first * second;
    return output;
}

function divide(first, second) {
    let output = first / second;
    return output;
}