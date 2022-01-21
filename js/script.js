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