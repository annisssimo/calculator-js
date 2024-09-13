import '../css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const displayExpression = document.querySelector('.user-input');
  const displayResult = document.querySelector('.res');
  const buttonsContainer = document.querySelector('.buttons');
  const themeSwitch = document.getElementById('slider');

  let output = '';

  function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.body.className = themeName;
  }

  function toggleTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  (function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setTheme('dark');
      themeSwitch.checked = true;
    } else {
      setTheme('light');
      themeSwitch.checked = false;
    }
  })();

  function updateDisplay() {
    displayExpression.textContent = output;
  }

  function calculateResult() {
    const sanitizedOutput = sanitizeExpression(output);

    if (sanitizedOutput.trim() === '') {
      displayResult.textContent = '0';
      return;
    }

    const postfix = intoPostfixNotation(sanitizedOutput.split(' '));
    const result = evaluatePostfix(postfix);
    displayResult.textContent = result;
    output = result.toString();
    updateDisplay();
  }

  function handlePlusMinus() {
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
      updateDisplay();
      calculateResult();
    }
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
          const lastChar = output.trim().slice(-1);
          if (['+', '-', '*', '/', '%'].includes(lastChar)) {
            output = output.slice(0, -2);
          }
          output += ` ${value} `;
        }
      } else if (value === '+/-') {
        handlePlusMinus();
      } else if (value === '.') {
        // Проверка на несколько точек подряд
        const lastNumber = output.split(/[\s+*/%-]+/).pop();
        if (!lastNumber.includes('.')) {
          output += value;
        }
      } else {
        output += value;
      }

      updateDisplay();
    }
  }

  function handleKeyboardInput(e) {
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
      calculateResult();
    } else if (key === 'ArrowDown' || key === 'ArrowUp') {
      handlePlusMinus();
    } else if (!isNaN(key) || key === '.') {
      const lastNumber = output.split(/[\s+*/%-]+/).pop();
      if (key !== '.' || !lastNumber.includes('.')) {
        output += key;
      }
    }

    updateDisplay();
  }

  buttonsContainer.addEventListener('click', handleButtonClick);
  themeSwitch.addEventListener('change', toggleTheme);
  document.addEventListener('keydown', handleKeyboardInput);
});

function sanitizeExpression(expression) {
  let sanitized = expression
    .replace(/([+\-*/%])\1+/g, '$1')
    .replace(/(\s)+/g, ' ')
    .trim();

  const lastChar = sanitized.slice(-1);
  if (['+', '-', '*', '/', '%'].includes(lastChar)) {
    sanitized = sanitized.slice(0, -1).trim();
  }

  sanitized = sanitized.replace(/([+\-*/])\s*\.$/, '$10');

  return sanitized;
}

function intoPostfixNotation(infixValue) {
  const stack = [];
  let output = [];
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 3 };

  infixValue.forEach((token) => {
    if (!isNaN(token)) {
      output.push(token);
    } else if (['+', '-', '*', '/', '%'].includes(token)) {
      if (token === '%') {
        const prevNumber = output.pop();
        const previousValue = output.length > 0 ? output[output.length - 1] : null;

        if (previousValue && !isNaN(previousValue)) {
          const percentageValue = (Number(prevNumber) / 100) * Number(previousValue);
          output.push(percentageValue.toString());
        } else {
          output.push((Number(prevNumber) / 100).toString());
        }
      } else {
        while (stack.length && precedence[token] <= precedence[stack[stack.length - 1]]) {
          output.push(stack.pop());
        }
        stack.push(token);
      }
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

  const result = stack[0];

  if (isNaN(result)) {
    return 0;
  }

  return result;
}
