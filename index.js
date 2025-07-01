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

const DIVIDE_BY_ZERO_ERROR = "Cannot divide by zero";

function divide(a, b) {
    if (b == 0) return DIVIDE_BY_ZERO_ERROR;
    
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

const DEFAULT_DISPLAY_CONTENT = "0";
let displayContent = DEFAULT_DISPLAY_CONTENT;

let clearNextPress = false;

keypad.addEventListener("click", event => {
    const key = event.target;
    const keyType = event.target.className;

    switch(keyType) {
        case(CLEAR_ENTRY):
            errorMessage() ? clearOnError() : removePreviousOperand();    
            break;
        case(CLEAR):
            errorMessage() ? clearOnError() : clearAll();
            break;
        case(BACKSPACE):
            errorMessage() ? clearOnError() : removeLastCharacter();
            break;
        case(DIGIT):
            errorMessage() ? clearOnError() : clearOnNextPress();
            displayDigit(key.textContent);
            break;
        case(OPERATOR):
            updateOperator(key.textContent);    
            break;
        case(PLUS_MINUS):
            clearOnNextPress();
            negate();
            break;
        case(DECIMAL_POINT):
            clearOnNextPress();
            convertToDecimal();
            break;
        case(EQUAL_SIGN):
            errorMessage() ? clearOnError() : displayResult(evaluate());
            break;                     
    }
});

const error = new CustomEvent("error");

keypad.addEventListener("error", () => {
    disableOperatorKeys();
    disablePlusMinusKey();
    disableDecimalPointKey();
});

function disableOperatorKeys() {
    let operatorKeys = document.querySelectorAll(".operator");
    operatorKeys.forEach(key => {
        disableKey(key);
        lightenKey(key);
    });
}

function disablePlusMinusKey() {
    let plusMinusKey = document.querySelector(".plus-minus");
    disableKey(plusMinusKey);
    lightenKey(plusMinusKey);
}

function disableDecimalPointKey() {
    let decimalPointKey = document.querySelector(".decimal-point");
    disableKey(decimalPointKey);
    lightenKey(decimalPointKey);
}

function disableKey(key) {
    key.disabled = true;
}

DISABLED_KEY_OPACITY = 0.4;

function lightenKey(key) {
    key.style.opacity = DISABLED_KEY_OPACITY;
}

const clearError = new CustomEvent("clearError");

keypad.addEventListener("clearError", () => {
    enableOperatorKeys();
    enablePlusMinusKey();
    enableDecimalPointKey();
});

function enableOperatorKeys() {
    let operatorKeys = document.querySelectorAll(".operator");
    operatorKeys.forEach(key => {
        enableKey(key);
        darkenKey(key);
    });
}

function enablePlusMinusKey() {
    let plusMinusKey = document.querySelector(".plus-minus");
    enableKey(plusMinusKey);
    darkenKey(plusMinusKey);
}

function enableDecimalPointKey() {
    let decimalPointKey = document.querySelector(".decimal-point");
    enableKey(decimalPointKey);
    darkenKey(decimalPointKey);
}

function enableKey(key) {
    key.disabled = false;
}

ENABLED_KEY_OPACITY = 1;

function darkenKey(key) {
    key.style.opacity = ENABLED_KEY_OPACITY;
}

function removePreviousOperand() {
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
    if (lastRemainingDigit() || errorMessage())
        clearDisplayContent();

    else
        display.textContent = displayContent = displayContent.slice(0, -1);
}

function lastRemainingDigit() {
    return displayContent.length === 1 || isNegative(displayContent) && displayContent.length === 2;
}

function errorMessage() {
    return displayContent === DIVIDE_BY_ZERO_ERROR;
}

function clearOnNextPress() {
    if (clearNextPress) {
        updateLeftOperand();
        clearDisplayContent();
        clearNextPress = false;
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
    if (!reachedDisplayLength()) {
        if (isNonzero())
            display.textContent = displayContent += content;

        else
            display.textContent = displayContent = content;
    }
}

const MAXIMUM_DIGITS_DISPLAYED = 14;

function reachedDisplayLength() {
    return displayContent.length === MAXIMUM_DIGITS_DISPLAYED;
}

function updateOperator(symbol) {    
    if (unevaluatedPair())
        displayResult(evaluate());

    operator = symbol;
    clearNextPress = true;
}

function unevaluatedPair() {
    return clearNextPress === false && operator != "";
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

function clearOnError() {
    if (errorMessage()) {
        keypad.dispatchEvent(clearError);
        clearAll();
    }
}

function evaluate() {
    if (identity()) {
        updateLeftOperand();
        return leftOperand;
    }
    else {
        updateRightOperand();    
        return operate(leftOperand, operator, rightOperand);
    }
}

function identity() {
    return operator === "";
}

function updateRightOperand() {
    rightOperand = updateOperand(displayContent);
}

function displayResult(result) {
    if (isErrorMessage(result)) {
        display.textContent = displayContent = result;
        keypad.dispatchEvent(error);
    }
    else if (isInteger(result)) {
        display.textContent = displayContent = calculationOverflow(result) ? convertScientificNotation(result) : result.toString();
        clearNextPress = true;
    }
    else {
        display.textContent = displayContent = truncateDecimal(result);
        clearNextPress = true;
    }

}

function isErrorMessage(result) {
    return typeof(result) === "string";
}

function isInteger(number) {
    return Math.floor(number) === number;
}

function calculationOverflow(result) {
    return result.toString().length > MAXIMUM_DIGITS_DISPLAYED;
}

const SIGNIFICANT_FIGURES = 4;

function convertScientificNotation(number) {
    return number.toExponential(SIGNIFICANT_FIGURES);
}

function truncateDecimal(decimal) {
    let digitsBeforeDecimal = getDigitsBeforeDecimal(decimal);
    decimalPlaceToRound = getDecimalPlaceToRound(digitsBeforeDecimal);

    return parseFloat(decimal.toFixed(decimalPlaceToRound)).toString();
}

const MAXIMUM_DECIMAL_PLACE = 13;

function getDecimalPlaceToRound(digitsBeforeDecimal) {
    return MAXIMUM_DECIMAL_PLACE - digitsBeforeDecimal;
}

function getDigitsBeforeDecimal(decimal) {
    let string = decimal.toString();
    return string.substring(0, string.indexOf(".")).length;
}