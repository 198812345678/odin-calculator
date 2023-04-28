const container = document.querySelector('.container');

const buttonWidth = 'calc(100% / 3 - 20px)';

// add a div with class “calculator” to the container
const calculator = document.createElement('div');
calculator.classList.add('calculator');
container.appendChild(calculator);

// draw a display in the calculator
const display = document.createElement('div');
display.classList.add('display');
calculator.appendChild(display);
display.style.height = '30px';
display.style.width = `calc(${buttonWidth} * 3)`;
display.style.border = '1px solid black';
display.textContent = '0';

// draw a panel after display
const panel = document.createElement('div');
panel.classList.add('panel');
calculator.appendChild(panel);

panel.style.display = 'flex';
panel.style.flexWrap = 'wrap';

// draw a button for each digit
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const digitButtons = digits.map(digit => {
    const button = document.createElement('button');
    button.classList.add('digit');
    panel.appendChild(button);
    button.textContent = digit;
    return button;
});

digitButtons.forEach(button => {
    button.style.flexBasis = `${buttonWidth}`;
});

// draw a button for each operator
const operators = ['+', '-', '*', '/', '='];
const operatorButtons = operators.map(operator => {
    const button = document.createElement('button');
    button.classList.add('operator');
    panel.appendChild(button);
    button.textContent = operator;
    return button;
});
operatorButtons.forEach(button => {
    button.style.flexBasis = `${buttonWidth}`;
});

// draw a button for clear
const clearButton = document.createElement('button');
clearButton.classList.add('clear');
panel.appendChild(clearButton);
clearButton.textContent = 'clear';
clearButton.style.flexBasis = `${buttonWidth}`;

let nums = [];
let operator = '';
let result = 0;

// add event listener to each button
digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (nums.length === 0 && operator === '') {
            nums.push(Number(button.textContent));
            display.textContent = button.textContent;
        }
        if (nums.length === 1 && operator !== '') {
            nums.push(Number(button.textContent));
            display.textContent += button.textContent;
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (nums.length === 1 && operator === '') {
            operator = button.textContent;
            display.textContent += button.textContent;
        } else if (nums.length === 2 && button.textContent === '=') {
            result = calculate(nums[0], nums[1], operator);
            updateDisplay(result);
            clearVariables();
        }
    });
});

clearButton.addEventListener('click', () => {
    clearDisplay();
    clearVariables();
});

// a function to calculate the result
const calculate = (num1, num2, operator) => {
    let result;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
    }
    return result;
};

// a function to update the display
const updateDisplay = (text) => {
    display.textContent = text;
}

// a function to clear the display
const clearDisplay = () => {
    display.textContent = '0';
}

// a function to clear the variables
const clearVariables = () => {
    nums = [];
    operator = '';
    result = 0;
}

