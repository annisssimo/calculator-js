export function sanitizeExpression(expression) {
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

export function intoPostfixNotation(infixValue) {
  const stack = [];
  let output = [];
  const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2 };

  infixValue.forEach((token) => {
    if (!isNaN(token)) {
      output.push(token);
    } else if (['+', '-', '*', '/', '%'].includes(token)) {
      if (token === '%') {
        const prevNumber = output.pop();
        const newValue = prevNumber !== 0 ? (Number(prevNumber) / 100).toString() : '0';
        output.push(newValue);
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

export function evaluatePostfix(postfix) {
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
          // Обработка деления на 0
          if (b === 0) {
            stack.push('Error');
          } else {
            stack.push(a / b);
          }
          break;
      }
    }
  });

  const result = stack[0];

  // Если результат "Error", вернуть его, иначе убедиться, что результат корректный
  return result === 'Error' ? 'Error' : isNaN(result) ? 0 : result;
}
