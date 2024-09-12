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
    const postfix = intoPostfixNotation(output.split(' '));
    console.log(postfix);
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
        output += ` ${value} `;
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

function intoPostfixNotation(infixValue) {
  const stack = [];
  let output = [];

  infixValue.forEach((token) => {
    if (!isNaN(token)) {
      output.push(token);
    } else if (['+', '-', '*', '/'].includes(token)) {
      while (stack.length && ['*', '/'].includes(stack[stack.length - 1])) {
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
