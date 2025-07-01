const ADDITION_OPERATOR = "+";
const SUBTRACTION_OPERATOR = "-";
const MULTIPLICATION_OPERATOR = "x";
const DIVISION_OPERATOR = "÷";

let leftOperand;
let operator = "";
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
const PLUS_MINUS = "plus-minus";
const DECIMAL_POINT = "decimal-point";
const EQUAL_SIGN = "equal-sign";

const keypad = document.querySelector(".buttons");
const display = document.querySelector(".display");
let displayContent = "";

keypad.addEventListener("click", event => {
    const key = event.target;
    const keyType = event.target.className;

    switch(keyType) {
        case(CLEAR_ENTRY):
            break;
        case(CLEAR):
            break;
        case(BACKSPACE):
            removeLastCharacter();
            break;
        case(DIGIT):
            clearAfterOperator();
            displayDigit(key.textContent);
            break;
        case(OPERATOR):
            updateOperator(key.textContent);    
            break;
        case(PLUS_MINUS):
            negate();
            break;
        case(DECIMAL_POINT):
            displayDecimal(key.textContent);
            break;
        case(EQUAL_SIGN):
            break;         
    }
});

function removeLastCharacter() {    
    displayContent = displayContent.slice(0, -1);
    display.textContent = displayContent;
}

function clearAfterOperator() {
    if (pressedOperatorKey()) {
        updateLeftOperand();
        clearDisplayContent();
    }
}

function updateLeftOperand() {
    leftOperand = updateOperand(displayContent);
}

function pressedOperatorKey() {
    return operator != "";
}

function updateOperand(displayContent) {
    return isDecimal(displayContent) ? parseFloat(displayContent) : parseInt(displayContent);
}

function isDecimal(displayContent) {
    return displayContent.includes(".");
}

function displayDigit(digit) {
    updateDisplayContent(digit);
}

function updateDisplayContent(content) {
    displayContent += content;
    display.textContent = displayContent;
}

function updateOperator(operation) {
    operator = operation;
}

function clearDisplayContent() {
    displayContent = "";
    display.textContent = displayContent;
}

function negate() {
    displayContent = isNegative(displayContent) ? displayContent.slice(1) : "-" + displayContent;
    display.textContent = displayContent;
}

function isNegative() {
    return displayContent.includes("-");
}

function displayDecimal(decimalPoint) {
    if (!isDecimal(displayContent))
        updateDisplayContent(decimalPoint);
}