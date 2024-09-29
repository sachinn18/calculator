const buttons = document.querySelectorAll('button');
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.textContent;

        if (!action) {
            appendNumber(value);
        } else if (action === 'clear') {
            clear();
        } else if (action === 'delete') {
            deleteNumber();
        } else if (action === 'equals') {
            compute();
        } else {
            chooseOperation(action);
        }

        updateDisplay();
    });
});

function appendNumber(number) {
    currentOperand = currentOperand.toString() + number.toString();
}

function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}

function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case 'add':
            computation = prev + current;
            break;
        case 'subtract':
            computation = prev - current;
            break;
        case 'multiply':
            computation = prev * current;
            break;
        case 'divide':
            computation = prev / current;
            break;
        default:
            return;
    }

    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
}

function updateDisplay() {
    currentOperandTextElement.textContent = currentOperand;
    previousOperandTextElement.textContent = previousOperand;
}
