// DOM selection of display, buttons + variable declaration for updateDisplay
let displayText = "";
let currentOperation = [];
let isTheAnswer = false;
let isRecentlyDeleted = false;
let exponentialSuperScript = "";

let symbolsRegex = /[+\-x÷]/;
let numbersRegex = /[\.0-9]/;

let party = document.querySelector('audio');
let display = document.querySelector("#display");
let calculatorButtons = document.querySelectorAll(".calculator-button");
calculatorButtons.forEach((button) => {
    button.addEventListener('click', buttonClicked)
})

window.addEventListener('keydown', keyPressed)

// Call updateDisplay with button click
function buttonClicked(e) {
    let buttonEntered = e.target.textContent;
    updateDisplay(buttonEntered);
}

// Call updateDisplay with keyboard button
function keyPressed(e) {
    let buttonEntered = e.key;
    
    // Converting keys that are associated with operators
    switch (e.key) {
        case "Enter":
            buttonEntered = "=";
            break;
        case "*":
            buttonEntered = "x";
            break;
        case "/":
            buttonEntered = "÷";
            break;
        case "^":
            buttonEntered = "xʸ";
            break;
        case "Backspace":
            buttonEntered = "Delete";
            break;
        case "Escape":
            buttonEntered = "Clear";
            break;
        case "?":
            buttonEntered = "Party";
            break;
    }
    updateDisplay(buttonEntered);
}

// Function to update display + operate if '=' is pressed
function updateDisplay(buttonEntered) {
        // if an operator is entered
        if (symbolsRegex.test(buttonEntered) && !/(xʸ)/.test(buttonEntered)) {
            if (symbolsRegex.test(display.textContent) && numbersRegex.test(display.textContent) === false || display.innerHTML.includes("<sup>") || symbolsRegex.test(currentOperation[1])) {
                // Don't let the user input more operators
            } else {
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
            }
        // if a number is entered
        } else if (numbersRegex.test(buttonEntered)) {
            if (isTheAnswer === true) {
                displayText = "";
            }
            if (buttonEntered === "." && displayText.includes(".")) {
                // Don't let the user input more periods
            } else if (currentOperation[1] == "xʸ") {
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
                if (numbersRegex.test(display.textContent) && display.innerHTML.includes("<sup>") === false && symbolsRegex.test(currentOperation[1]) === false) {
                    if (isRecentlyDeleted) {
                        isRecentlyDeleted = false;
                    } else {
                        currentOperation.push(Number(displayText));
                    }
                    currentOperation.push("xʸ");
                    console.log(currentOperation);
                    display.innerHTML += '<sup>y</sup>';
                }
                break;
            case "=":
                if (exponentialSuperScript !== "") {
                    currentOperation.push(Number(exponentialSuperScript));
                } else {
                    currentOperation.push(Number(displayText));
                }
                console.log(currentOperation);
    
                // Display results + check for lots of decimals, round if needed
                let stringResult = String(operate(currentOperation[0], currentOperation[2], currentOperation[1]));
                let periodIndex = stringResult.indexOf(".");
                let decimals = stringResult.slice(periodIndex);
                if (isNaN(stringResult)) {
                    displayText = "Error";
                } else if (Array.from(decimals).length > 2) {
                    displayText = operate(currentOperation[0], currentOperation[2], currentOperation[1]).toFixed(2);
                } else {
                    displayText = operate(currentOperation[0], currentOperation[2], currentOperation[1]);
                }
    
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
                if (symbolsRegex.test(display.textContent) || currentOperation[1] == "xʸ") {
                    exponentialSuperScript = ""
                    isRecentlyDeleted = true;
                    displayText = currentOperation[0];
                    display.textContent = displayText;
                    currentOperation.pop();
                    console.log(currentOperation);
                } else {
                    displayText = displayText.slice(0, -1);
                    display.textContent = displayText;   
                }
                break;
            case "Party":
                party.currentTime = 0;
                party.play();
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