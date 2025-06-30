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