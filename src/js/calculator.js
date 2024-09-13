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
          stack.push(a / b);
          break;
      }
    }
  });

  const result = stack[0];

  return isNaN(result) ? 0 : result;
}
