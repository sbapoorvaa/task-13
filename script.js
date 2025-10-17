const display = document.getElementById('display');
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

let isDarkMode = true;

modeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    body.classList.remove('dark-mode');
    modeToggle.textContent = 'Dark Mode';
  } else {
    body.classList.add('dark-mode');
    modeToggle.textContent = 'Light Mode';
  }
});

const buttons = document.querySelectorAll('.buttons button');
let expression = '';

buttons.forEach(btn => {
  if (btn.classList.contains('digit')) {
    btn.addEventListener('click', () => {
      expression += btn.dataset.digit;
      display.value = expression;
    });
  } else if (btn.classList.contains('operator')) {
    btn.addEventListener('click', () => {
      expression += btn.dataset.op;
      display.value = expression;
    });
  } else if (btn.classList.contains('func')) {
    btn.addEventListener('click', () => {
      const func = btn.dataset.func;
      if (func === 'sqrt') {
        expression += 'Math.sqrt('; 
      } else {
        expression += 'Math.' + func + '(';
      }
      display.value = expression;
    });
  } else if (btn.classList.contains('clear')) {
    btn.addEventListener('click', () => {
      expression = '';
      display.value = '';
    });
  } else if (btn.classList.contains('backspace')) {
    btn.addEventListener('click', () => {
      expression = expression.slice(0, -1);
      display.value = expression;
    });
  } else if (btn.classList.contains('equals')) {
    btn.addEventListener('click', () => {
      try {
        // Close all open parentheses for functions
        let openParens = (expression.match(/\(/g) || []).length;
        let closeParens = (expression.match(/\)/g) || []).length;
        for (let i = 0; i < openParens - closeParens; i++) {
          expression += ')';
        }
        const result = eval(expression);
        display.value = result;
        expression = result.toString();
      } catch (e) {
        display.value = 'Error';
        expression = '';
      }
    });
  }
});