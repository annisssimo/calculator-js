import '../css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const displayExpression = document.querySelector('.user-input');
  const displayResult = document.querySelector('.res');
  const buttonsContainer = document.querySelector('.buttons');
  const themeSwitch = document.getElementById('slider');

  let output = '';

  // Function to set a given theme/color-scheme
  function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.body.className = themeName;
  }

  // Function to toggle between light and dark theme
  function toggleTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  // Immediately invoked function to set the theme on initial load
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
    const postfix = intoPostfixNotation(sanitizedOutput.split(' '));
    const result = evaluatePostfix(postfix);
    displayResult.textContent = result;
    output = result.toString();
    updateDisplay();
  }

  function handlePlusMinus() {
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
  themeSwitch.addEventListener('change', toggleTheme);
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
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 3 }; // % has high precedence

  infixValue.forEach((token) => {
    if (!isNaN(token)) {
      output.push(token);
    } else if (['+', '-', '*', '/', '%'].includes(token)) {
      if (token === '%') {
        // Take the previous number, pop it, and calculate its percentage from the previous value
        const prevNumber = output.pop();
        const previousValue = output.length > 0 ? output[output.length - 1] : null;

        if (previousValue && !isNaN(previousValue)) {
          const percentageValue = (Number(prevNumber) / 100) * Number(previousValue);
          output.push(percentageValue.toString());
        } else {
          // If there's no previous value, fallback to default percentage calculation
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

  return stack[0];
}
