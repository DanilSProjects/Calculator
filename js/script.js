// DOM selection of display, buttons + variable declaration for updateDispaly
let displayText = "";
let currentOperation = [];
let isTheAnswer = false;
let isRecentlyDeleted = false;
let exponentialSuperScript = "";
let display = document.querySelector("#display");
let calculatorButtons = document.querySelectorAll(".calculator-button");
calculatorButtons.forEach((button) => {
    button.addEventListener('click', updateDisplay)
})

// Function to update display + operate if '=' is pressed
function updateDisplay(e) {
    let buttonEntered = e.target.textContent;

    // if an operator is entered
    if (/[+\-x÷]/.test(buttonEntered) && !/(xʸ)/.test(buttonEntered)) {
        if (isRecentlyDeleted) {
            isRecentlyDeleted = false;
        } else {
            currentOperation.push(Number(displayText));
        }
        displayText = buttonEntered;
        display.textContent = displayText;
        currentOperation.push(displayText);
        console.log(currentOperation);
        displayText = "";
    // if a number is entered
    } else if (/[0-9]/.test(buttonEntered)) {
        if (isTheAnswer === true) {
            displayText = "";
        }
        if (currentOperation[1] == "xʸ") {
            exponentialSuperScript += buttonEntered;
            let tagBeginIndex = display.innerHTML.indexOf("<");
            display.innerHTML = display.innerHTML.slice(0, tagBeginIndex) + `<sup>${exponentialSuperScript}</sup>`;
        } else {
            displayText += buttonEntered;
            display.textContent = displayText;
        }
        isTheAnswer = false;
    }

    // special case switch statement, including special display for exponentials
    switch (buttonEntered) {
        case "xʸ":
            if (isRecentlyDeleted) {
                isRecentlyDeleted = false;
            } else {
                currentOperation.push(Number(displayText));
            }
            currentOperation.push("xʸ");
            console.log(currentOperation);
            display.innerHTML += '<sup>y</sup>';
            break;
        case "=":
            if (exponentialSuperScript !== "") {
                currentOperation.push(Number(exponentialSuperScript));
            } else {
                currentOperation.push(Number(displayText));
            }
            console.log(currentOperation);
            displayText = operate(currentOperation[0], currentOperation[2], currentOperation[1]);
            display.textContent = displayText;
            currentOperation = [];
            isTheAnswer = true;
            exponentialSuperScript = "";
            break;
        case "Clear":
            displayText = "";
            currentOperation = [];
            display.textContent = displayText;
            break;
        case "Delete":
            if (currentOperation[1] == "xʸ") {
                let tagBeginIndex = display.innerHTML.indexOf("<");
                display.innerHTML = display.innerHTML.slice(0, tagBeginIndex);
                exponentialSuperScript = "";
            } else {
                displayText = displayText.slice(0, -1);
                display.textContent = displayText;   
            }
            if (/[+\-x÷]/.test(display.textContent) || currentOperation[1] == "xʸ") {
                isRecentlyDeleted = true;
                currentOperation.pop();
                console.log(currentOperation);
            } 
            break;
    }
}

// Main operate function -> takes in operator and 2 numbers
function operate(first, second, operator) {
    switch (operator) {
        case "+":
            return add(first, second);
        case "-":
            return subtract(first, second);
        case "x":
            return multiply(first, second);
        case "÷":
            return divide(first, second);
        case "xʸ":
            return powerOf(first, second);
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

function powerOf(first, second) {
    let output = first ** second;
    return output;
}