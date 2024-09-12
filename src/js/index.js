import '../css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const displayExpression = document.querySelector('.user-input');
  const displayResult = document.querySelector('.res');
  const buttonsContainer = document.querySelector('.buttons');

  let output = '';

  function updateDisplay() {
    displayExpression.textContent = output;
  }

  function calculateResult() {
    const sanitizedOutput = sanitizeExpression(output);
    const postfix = intoPostfixNotation(sanitizedOutput.split(' '));
    const result = evaluatePostfix(postfix);
    displayResult.textContent = result;
    output = result.toString();
    updateDisplay();
  }

  function handlePlusMinus() {
    alert('changing plus minus');
  }

  function handleButtonClick(e) {
    if (e.target.classList.contains('btn')) {
      const value = e.target.textContent;

      if (value === '=') {
        calculateResult();
      } else if (value === 'AC') {
        output = '';
        displayResult.textContent = '0';
      } else if (['+', '-', '*', '/', '%'].includes(value)) {
        if (output.length > 0) {
          const lastChar = output.slice(-2, -1);
          if (['+', '-', '*', '/', '%'].includes(lastChar)) {
            output = output.slice(0, -3);
          }
          output += ` ${value} `;
        }
      } else if (value === '+/-') {
        handlePlusMinus();
      } else {
        output += value;
      }

      updateDisplay();
    }
  }

  buttonsContainer.addEventListener('click', handleButtonClick);
});

function sanitizeExpression(expression) {
  return expression
    .replace(/([+\-*/%])\1+/g, '$1')
    .replace(/(\s)+/g, ' ')
    .trim();
}

function intoPostfixNotation(infixValue) {
  const stack = [];
  let output = [];
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };

  infixValue.forEach((token) => {
    if (!isNaN(token)) {
      output.push(token);
    } else if (['+', '-', '*', '/'].includes(token)) {
      while (stack.length && precedence[token] <= precedence[stack[stack.length - 1]]) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  });

  while (stack.length) {
    output.push(stack.pop());
  }

  return output;
}

function evaluatePostfix(postfix) {
  const stack = [];

  postfix.forEach((token) => {
    if (!isNaN(token)) {
      stack.push(Number(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();

      switch (token) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          stack.push(a / b);
          break;
      }
    }
  });

  return stack[0];
}
