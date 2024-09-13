import '../css/styles.css';
import { handleButtonClick, handleKeyboardInput } from './inputHandlers.js';
import { initializeTheme, toggleTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
  const displayExpression = document.querySelector('.user-input');
  const displayResult = document.querySelector('.res');
  const buttonsContainer = document.querySelector('.buttons');
  const themeSwitch = document.getElementById('slider');

  initializeTheme(themeSwitch);

  buttonsContainer.addEventListener('click', (e) =>
    handleButtonClick(e, displayExpression, displayResult),
  );
  themeSwitch.addEventListener('change', toggleTheme);
  document.addEventListener('keydown', (e) =>
    handleKeyboardInput(e, displayExpression, displayResult),
  );
});
