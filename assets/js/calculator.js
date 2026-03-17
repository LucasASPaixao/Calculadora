const calculatorState = {
  currentExpression: "",
  currentResult: "0",
  lastActionWasEquals: false,
};

const expressionDisplay = document.getElementById("display-expression");
const resultDisplay = document.getElementById("display-result");
const keysContainer = document.querySelector(".keys");

function updateDisplays() {
  expressionDisplay.textContent = calculatorState.currentExpression;
  resultDisplay.textContent = calculatorState.currentResult || "0";
}

function sanitizeExpression(expression) {
  return expression.replace(/[^0-9+\-*/.() ]/g, "");
}

function canAppendOperator(operator) {
  const expr = calculatorState.currentExpression;
  if (!expr) {
    // Permite apenas "-" no começo para números negativos
    return operator === "-";
  }

  const lastChar = expr[expr.length - 1];
  const isLastCharOperator = /[+\-*/]/.test(lastChar);

  if (isLastCharOperator) {
    // Evita operadores duplicados (ex.: "5++") – substitui o último
    calculatorState.currentExpression =
      expr.slice(0, expr.length - 1) + operator;
    return false;
  }

  return true;
}

function appendDigit(digit) {
  if (calculatorState.lastActionWasEquals) {
    // Após "=", iniciar nova expressão ao digitar número
    calculatorState.currentExpression = digit;
    calculatorState.lastActionWasEquals = false;
  } else {
    calculatorState.currentExpression += digit;
  }
  evaluateExpressionLive();
}

function appendOperator(operatorSymbol) {
  // Continuação após "=": reutiliza o resultado como base se operador for pressionado
  if (calculatorState.lastActionWasEquals) {
    calculatorState.currentExpression = calculatorState.currentResult || "0";
    calculatorState.lastActionWasEquals = false;
  }

  if (!canAppendOperator(operatorSymbol)) {
    evaluateExpressionLive();
    updateDisplays();
    return;
  }

  calculatorState.currentExpression += operatorSymbol;
  evaluateExpressionLive();
}

function appendDecimal() {
  const expr = calculatorState.currentExpression;
  if (!expr) {
    calculatorState.currentExpression = "0.";
    evaluateExpressionLive();
    return;
  }

  // Evita múltiplos pontos no mesmo número
  const lastNumberMatch = expr.match(/(\d+\.?\d*)$/);
  if (lastNumberMatch && lastNumberMatch[0].includes(".")) {
    return;
  }

  calculatorState.currentExpression += ".";
  evaluateExpressionLive();
}

function clearAll() {
  calculatorState.currentExpression = "";
  calculatorState.currentResult = "0";
  calculatorState.lastActionWasEquals = false;
  updateDisplays();
}

function deleteLast() {
  if (!calculatorState.currentExpression) {
    return;
  }
  calculatorState.currentExpression = calculatorState.currentExpression.slice(
    0,
    -1,
  );
  evaluateExpressionLive();
}

function evaluateExpressionLive() {
  const expr = calculatorState.currentExpression;
  if (!expr) {
    calculatorState.currentResult = "0";
    updateDisplays();
    return;
  }

  const sanitized = sanitizeExpression(expr);
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return ${sanitized}`);
    const value = fn();

    if (typeof value === "number" && Number.isFinite(value)) {
      // Formatação simples para evitar muitos decimais
      calculatorState.currentResult = Number(value.toFixed(8)).toString();
    } else {
      calculatorState.currentResult = "";
    }
  } catch {
    // Expressão intermediária inválida: não quebra a UI
    calculatorState.currentResult = "";
  }

  updateDisplays();
}

function evaluateFinal() {
  const expr = calculatorState.currentExpression;
  if (!expr) {
    return;
  }

  const sanitized = sanitizeExpression(expr);
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(`return ${sanitized}`);
    const value = fn();

    if (typeof value === "number" && Number.isFinite(value)) {
      calculatorState.currentResult = Number(value.toFixed(8)).toString();
    } else {
      calculatorState.currentResult = "Erro";
    }
  } catch {
    calculatorState.currentResult = "Erro";
  }

  calculatorState.currentExpression = "";
  calculatorState.lastActionWasEquals = true;
  updateDisplays();
}

function handleButtonClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const action = target.getAttribute("data-action");

  switch (action) {
    case "digit":
      appendDigit(target.getAttribute("data-value") || "");
      break;
    case "add":
      appendOperator("+");
      break;
    case "subtract":
      appendOperator("-");
      break;
    case "multiply":
      appendOperator("*");
      break;
    case "divide":
      appendOperator("/");
      break;
    case "decimal":
      appendDecimal();
      break;
    case "clear":
      clearAll();
      break;
    case "delete":
      deleteLast();
      break;
    case "equals":
      evaluateFinal();
      break;
    default:
      break;
  }
}

function handleKeyDown(event) {
  const { key } = event;

  if (/\d/.test(key)) {
    appendDigit(key);
    return;
  }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    appendOperator(key);
    return;
  }

  if (key === "." || key === ",") {
    event.preventDefault();
    appendDecimal();
    return;
  }

  if (key === "Enter" || key === "=") {
    event.preventDefault();
    evaluateFinal();
    return;
  }

  if (key === "Backspace") {
    deleteLast();
    return;
  }

  if (key === "Escape") {
    clearAll();
  }
}

if (keysContainer) {
  keysContainer.addEventListener("click", handleButtonClick);
}

document.addEventListener("keydown", handleKeyDown);

updateDisplays();

