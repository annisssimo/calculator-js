import '../css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const displayExpression = document.querySelector('.user-input');
  const displayResult = document.querySelector('.res');
  const buttons = document.querySelectorAll('.btn');

  let output = '';

  function updateDisplay() {
    displayExpression.textContent = output;
  }

  function calculateResult() {
    alert('calculating...');
  }

  function handleButtonClick(e) {
    const value = e.target.textContent;

    if (value === '=') {
      calculateResult();
    } else if (value === 'AC') {
      output = '';
      displayResult.textContent = '0';
    } else if (value === 'Backspace') {
      output = output.slice(0, -1);
    } else if (['+', '-', '*', '/', '%'].includes(value)) {
      output += ` ${value} `;
    } else {
      output += value;
    }

    updateDisplay();
  }

  buttons.forEach((button) => button.addEventListener('click', handleButtonClick));
});
