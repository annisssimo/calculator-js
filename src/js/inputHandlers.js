import { sanitizeExpression, intoPostfixNotation, evaluatePostfix } from './calculator.js';
import { updateDisplay } from './display.js';

let output = '';

export function handlePlusMinus(displayExpression) {
  if (output.trim() === '' || output.trim() === 0) return;

  const parts = output.trim().split(' ');

  if (parts.length > 0 && !isNaN(parts[parts.length - 1])) {
    let lastNumber = parts.pop();

    if (lastNumber.startsWith('-')) {
      lastNumber = lastNumber.slice(1);
    } else {
      lastNumber = '-' + lastNumber;
    }

    parts.push(lastNumber);
    output = parts.join(' ');
    updateDisplay(displayExpression, output);
  }
}

export function handleButtonClick(e, displayExpression, displayResult) {
  if (e.target.classList.contains('btn')) {
    const value = e.target.textContent;

    if (value === '=') {
      calculateResult(displayResult);
    } else if (value === 'AC') {
      output = '';
      displayResult.textContent = '0';
    } else if (['+', '-', '*', '/', '%'].includes(value)) {
      if (output.length > 0) {
        const lastChar = output.trim().slice(-1);
        if (['+', '-', '*', '/', '%'].includes(lastChar)) {
          output = output.slice(0, -2);
        }
        output += ` ${value} `;
      }
    } else if (value === '+/-') {
      handlePlusMinus(displayExpression);
    } else if (value === '.') {
      const lastNumber = output.split(/[\s+*/%-]+/).pop();
      if (!lastNumber.includes('.')) {
        output += value;
      }
    } else {
      output += value;
    }

    updateDisplay(displayExpression, output);
  }
}

export function handleKeyboardInput(e, displayExpression, displayResult) {
  const key = e.key;

  if (key === 'Backspace' || key === 'Delete') {
    output = output.slice(0, -1);
  } else if (key === 'Escape') {
    output = '';
    displayResult.textContent = '0';
  } else if (['+', '-', '*', '/', '%'].includes(key)) {
    if (output.length > 0) {
      const lastChar = output.slice(-2, -1);
      if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        output = output.slice(0, -3);
      }
      output += ` ${key} `;
    }
  } else if (key === 'Enter') {
    calculateResult(displayResult);
  } else if (key === 'ArrowDown' || key === 'ArrowUp') {
    handlePlusMinus(displayExpression);
  } else if (!isNaN(key) || key === '.') {
    const lastNumber = output.split(/[\s+*/%-]+/).pop();
    if (key !== '.' || !lastNumber.includes('.')) {
      output += key;
    }
  }

  updateDisplay(displayExpression, output);
}

export function calculateResult(displayResult) {
  const sanitizedOutput = sanitizeExpression(output);

  if (sanitizedOutput.trim() === '') {
    displayResult.textContent = '0';
    return;
  }

  const postfix = intoPostfixNotation(sanitizedOutput.split(' '));
  let result = evaluatePostfix(postfix);

  if (result === 'Error') {
    displayResult.textContent = result;
    output = '';
  } else {
    displayResult.textContent = result;
    output = result.toString();
  }
}
