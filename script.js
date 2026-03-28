const display = document.getElementById("display");

let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

function inputNumber(num) {
  const current = display.textContent;
  if (waitingForSecondValue) {
    display.textContent = num === "." ? "0." : num;
    waitingForSecondValue = false;
  } else {
    if (current === "0" && num !== ".") {
      display.textContent = num;
    } else if (num === "." && current.includes(".")) {
      return;
    } else {
      display.textContent = current + num;
    }
  }
}

function setOperator(nextOperator) {
  const value = parseFloat(display.textContent);

  if (firstValue === null) {
    firstValue = value;
  } else if (operator && !waitingForSecondValue) {
    const result = calculate(firstValue, value, operator);
    display.textContent = String(result);
    firstValue = result;
  }

  operator = nextOperator;
  waitingForSecondValue = true;
}

function calculate(a, b, op) {
  if (op === "add") return a + b;
  if (op === "subtract") return a - b;
  if (op === "multiply") return a * b;
  if (op === "divide") return b === 0 ? "Error" : a / b;
  return b;
}

function clearAll() {
  firstValue = null;
  operator = null;
  waitingForSecondValue = false;
  display.textContent = "0";
}

function percent() {
  const value = parseFloat(display.textContent);
  display.textContent = String(value / 100);
}

function toggleSign() {
  const value = parseFloat(display.textContent);
  display.textContent = String(value * -1);
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.getAttribute("data-number");
    const action = button.getAttribute("data-action");

    if (number !== null) {
      inputNumber(number);
      return;
    }

    if (action === "clear") {
      clearAll();
    } else if (action === "percent") {
      percent();
    } else if (action === "sign") {
      toggleSign();
    } else if (["add", "subtract", "multiply", "divide"].includes(action)) {
      setOperator(action);
    } else if (action === "equals") {
      if (operator === null) return;
      const value = parseFloat(display.textContent);
      const result = calculate(firstValue, value, operator);
      display.textContent = String(result);
      firstValue = null;
      operator = null;
      waitingForSecondValue = false;
    }
  });
});