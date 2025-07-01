const ADDITION_OPERATOR = "+";
const SUBTRACTION_OPERATOR = "-";
const MULTIPLICATION_OPERATOR = "x";
const DIVISION_OPERATOR = "÷";

let leftOperand = 0;
let operator = "";
let rightOperand = 0;

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

const DEFAULT_DISPLAY_CONTENT = "0";
const MAXIMUM_DECIMAL_PLACE = 13;

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

let displayContent = DEFAULT_DISPLAY_CONTENT;
let pressedOperatorKey = false;

keypad.addEventListener("click", event => {
    const key = event.target;
    const keyType = event.target.className;

    switch(keyType) {
        case(CLEAR_ENTRY):
            clearPreviousOperand();
            break;
        case(CLEAR):
            clearAll();
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
            convertToDecimal();
            break;
        case(EQUAL_SIGN):
            displayResult(evaluate());
            break;         
    }
});

function clearPreviousOperand() {
    if (rightOperand)
        leftOperand = 0;

    else
        rightOperand = 0;

    clearDisplayContent();
}

function clearAll() {
    leftOperand = rightOperand = 0;
    operator = "";
     
    clearDisplayContent();
}

function clearDisplayContent() {
    display.textContent = displayContent = DEFAULT_DISPLAY_CONTENT;
}

function removeLastCharacter() {  
    if (!lastRemainingDigit())
        display.textContent = displayContent = displayContent.slice(0, -1);

    else
        clearDisplayContent();
}

function lastRemainingDigit() {
    return displayContent.length === 1 || isNegative(displayContent) && displayContent.length === 2;
}

function clearAfterOperator() {
    if (pressedOperatorKey) {
        updateLeftOperand();
        clearDisplayContent();
        pressedOperatorKey = false;
    }
}

function updateLeftOperand() {
    leftOperand = updateOperand(displayContent);
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
    if (isNonzero())
        display.textContent = displayContent += content;

    else
        display.textContent = displayContent = content;
}

function updateOperator(operation) {
    if (unevaluatedPair())
        evaluate();
    
    operator = operation;
    pressedOperatorKey = true;
}

function unevaluatedPair() {
    return leftOperand != 0;
}

function negate() {
    if (isNonzero()) {
        displayContent = isNegative(displayContent) ? displayContent.slice(1) : "-" + displayContent;
        display.textContent = displayContent;
    }
}

function isNegative() {
    return displayContent.includes("-");
}

function isNonzero() {
    return displayContent != "0";
}

function convertToDecimal() {
    if (!isDecimal(displayContent))
        display.textContent = displayContent += ".";
}

function evaluate() {
    updateRightOperand();
    return operate(leftOperand, operator, rightOperand);
}

function updateRightOperand() {
    rightOperand = updateOperand(displayContent);
}

function displayResult(result) {
    if (isErrorMessage(result))
        display.textContent = displayContent = result;

    else if (isInteger(result))
        display.textContent = displayContent = result.toString();

    else
        display.textContent = displayContent = parseFloat(result.toFixed(MAXIMUM_DECIMAL_PLACE));
}

function isErrorMessage(result) {
    return typeof(result) === "string";
}

function isInteger(number) {
    return Math.floor(number) === number;
}