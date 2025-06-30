const ADDITION_OPERATOR = "+";
const SUBTRACTION_OPERATOR = "-";
const MULTIPLICATION_OPERATOR = "*";
const DIVISION_OPERATOR = "/";

let leftOperand;
let operator;
let rightOperand;

function operate(leftOperand, operator, rightOperand) {
    switch(operator) {
        case ADDITION_OPERATOR:
            return add(leftOperand, rightOperand);
        case SUBTRACTION_OPERATOR:
            return subtract(leftOperand, rightOperand);
        case MULTIPLICATION_OPERATOR:
            return multiply(leftOperand, rightOperand);
        case DIVISION_OPERATOR:
            return divide(leftOperand, rightOperand);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return "Cannot divide by zero";
    
    return a / b;
}

const CLEAR_ENTRY = "clear-entry";
const CLEAR = "clear";
const BACKSPACE = "backspace";
const DIGIT= "digit";
const OPERATOR = "operator";
const EQUAL_SIGN = "equal-sign";

const keypad = document.querySelector(".buttons");
const display = document.querySelector(".display");
let displayContent;

keypad.addEventListener("click", event => {
    const key = event.target;
    const keyType = event.target.className;

    switch(keyType) {
        case(CLEAR_ENTRY):
            break;
        case(CLEAR):
            break;
        case(BACKSPACE):
            break;
        case(DIGIT):
            display.textContent += key.textContent;
            displayContent += key.textContent;
            break;
        case(OPERATOR):
            break;
        case(EQUAL_SIGN):
            break;         
    }
});