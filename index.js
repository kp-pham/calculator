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
const UNDO = "undo";
const DIGIT = "digit";
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
            clearEntry();    
            break;
        case(CLEAR):
            clearAll();
            break;
        case(UNDO):
            undo();
            break;
        case(DIGIT):
            enterDigit(key.textContent);
            break;
        case(OPERATOR):
            enterOperation(key.textContent);    
            break;
        case(PLUS_MINUS):
            negate();
            break;
        case(DECIMAL_POINT):
            enterDecimalPoint();
            break;
        case(EQUAL_SIGN):
            performOperation();
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

function clearEntry() {
    errorMessage() ? clearOnError() : removePreviousOperand();
}

function removePreviousOperand() {
    if (rightOperand)
        leftOperand = 0;

    else
        rightOperand = 0;

    clearDisplayContent();
}

function clearAll() {
    errorMessage() ? clearOnError() : reset();
}

function reset() {
    leftOperand = rightOperand = 0;
    operator = "";

    clearDisplayContent();
}

function clearDisplayContent() {
    display.textContent = displayContent = DEFAULT_DISPLAY_CONTENT;
}

function undo() {
    errorMessage() ? clearOnError() : removeLastCharacter();
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

function enterDigit(digit) {
    errorMessage() ? clearOnError() : clearOnNextPress();
    displayDigit(digit);
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

function enterOperation(symbol) {    
    if (unevaluatedPair())
        displayResult(evaluate());

    updateOperator(symbol);
}

function updateOperator(symbol) {
    operator = symbol;
    clearNextPress = true;
}

function unevaluatedPair() {
    return clearNextPress === false && operator != "";
}

function negateNumber() {
    clearOnNextPress();

    if (isNonzero())
        negate();
}

function negate() {
    displayContent = isNegative(displayContent) ? displayContent.slice(1) : "-" + displayContent;
    display.textContent = displayContent;
}

function isNegative() {
    return displayContent.includes("-");
}

function isNonzero() {
    return displayContent != "0";
}

function enterDecimalPoint() {
    clearOnNextPress();
    convertToDecimal();
}

function convertToDecimal() {
    if (!isDecimal(displayContent))
        display.textContent = displayContent += ".";
}

function clearOnError() {
    if (errorMessage()) {
        keypad.dispatchEvent(clearError);
        reset();
    }
}

function performOperation() {
    errorMessage() ? clearOnError() : displayResult(evaluate());
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

document.addEventListener("keydown", event => {
    if (digitKeyPressed(event))
        updateDisplayContent(event.key);
    
    else if (operatorKeyPressed(event))
        handleOperatorKeyPressed(event.key);

    else if (clearKeyPressed(event))
        handleClearKeyPressed(event.key);
    
});

function digitKeyPressed(event) {
    return event.key >= "0" && event.key <= "9";
}

const PLUS_SIGN = "+";
const HYPHEN_MINUS = "-";
const ASTERISK = "*";
const FORWARD_SLASH = "/";

function shiftKeyPressed(event) {
    return event.shiftKey;
}

function operatorKeyPressed(event) {
    return shiftKeyPressed(event) && event.key === PLUS_SIGN ||
        event.key === HYPHEN_MINUS ||
        event.key === ASTERISK ||
        event.key === FORWARD_SLASH;
}

function handleOperatorKeyPressed(key) {
    console.log(key);
    switch(key) {
        case PLUS_SIGN:
            updateOperator(ADDITION_OPERATOR);
            break;
        case HYPHEN_MINUS:
            updateOperator(SUBTRACTION_OPERATOR);
            break;
        case ASTERISK:
            updateOperator(MULTIPLICATION_OPERATOR);
            break;
        case FORWARD_SLASH:
            updateOperator(DIVISION_OPERATOR);
            break;
    }
}

const DELETE = "Delete";
const ESCAPE = "Escape";
const BACKSPACE = "Backspace";

function clearKeyPressed(event) {
    return event.key === DELETE || event.key === ESCAPE || event.key === BACKSPACE;
}

function handleClearKeyPressed(key) {
    switch(key) {
        case DELETE:
            break;
        case ESCAPE:
            break;
        case BACKSPACE:
            break;
    }
}