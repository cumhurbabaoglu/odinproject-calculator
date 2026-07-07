const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const multiply = function(a, b) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

const squareRoot = function(a) {
    return Math.sqrt(a);
}

const exponent = function(a, b) {
    return Math.pow(a, b);
}

let num1 = "";
let operatorSelected;
let num2 = "";
let resultDisplayed = false;

const operate = function(operator, num1, num2) {
    if (operator === "+") {
        return add(+num1, +num2);
    };
    if (operator === "-") {
        return subtract(+num1, +num2);
    };
    if (operator === "x" || operator === "*") {
        return multiply(+num1, +num2);
    };
    if (operator === "÷" || operator === "/") {
        return divide(+num1, +num2);
    };
    if (operator === "√") {
        return squareRoot(+num1);
    }
    if (operator === "xⁿ") {
        return exponent(+num1, +num2);
    }
};

const allButtons = document.querySelectorAll("button");

allButtons.forEach(button => {
    button.addEventListener("pointerdown", () => {
        button.classList.add("pressed");
    })
    button.addEventListener("pointerup", () => {
        setTimeout(() => {
            button.classList.remove("pressed")
        }, 110);
    })
    button.addEventListener("pointerleave", () => {
        setTimeout(() => {
            button.classList.remove("pressed")
        }, 110);
    })
})

const digitButtons = document.querySelectorAll(".number-button");
const display = document.querySelector(".display");
const operatorButtons = document.querySelectorAll(".operator-button");
const equalButton = document.querySelector("#equal-sign");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const decimalButton = document.querySelector("#decimal-point");

const updateNum1 = function(digitClicked) {
    num1 = num1 + digitClicked;
    display.textContent = num1;
}

const updateNum2 = function(digitClicked) {
    num2 = num2 + digitClicked;
    display.textContent = num1 + operatorSelected + num2;
}

operatorButtons.forEach(operator => {
    operator.addEventListener("click", () => {
        if (num2.length > 0) {
            const result = operate(operatorSelected, num1, num2);
            if (result === Infinity) {
                display.textContent = "Division by Zero";
                num1 = "";
                operatorSelected = undefined;
                num2 = "";
                resultDisplayed = true;
                return;
        }
            num1 = result;
            num2 = "";
        }
        operatorSelected = operator.textContent;
        if (num1.toString().length > 14) {
            display.textContent = num1.toPrecision(10) + operatorSelected;
        } else {
            display.textContent = num1 + operatorSelected;
        }
        resultDisplayed = false;
        decimalButton.disabled = false;
    })
})

digitButtons.forEach(digit => {
    digit.addEventListener("click", () => {
        let digitClicked;
        if (resultDisplayed) {
            num1 = "";
            digitClicked = digit.textContent;
            updateNum1(digitClicked);
            resultDisplayed = false;
        }
        else if (operatorSelected === undefined || operatorSelected === "√") {
            digitClicked = digit.textContent;
            updateNum1(digitClicked);
        }
        else {
            digitClicked = digit.textContent;
            updateNum2(digitClicked);
        }
    })
})

equalButton.addEventListener("click", () => {
    if (num1.length === 0) {
        display.textContent = "0";
    }
    else if (operatorSelected === undefined) {
        display.textContent = num1;
    }
    else if (operatorSelected && num2.length === 0) {
    display.textContent = num1 + operatorSelected;
   } else {
   let result = operate(operatorSelected, num1, num2);
        if (result === Infinity) {
            display.textContent = "Division by Zero";
            num1 = "";
            operatorSelected = undefined;
            num2 = "";
            resultDisplayed = true;
            return;
        }
        if (result.toString().split(".")[1] !== undefined && result.toString().split(".")[1].length > 7) {
            result = +result.toFixed(7);
        }
        if (result.toString().length > 14) {
            display.textContent = result.toPrecision(10);
        } else {
            display.textContent = result;
        }
   num1 = result;
   operatorSelected = undefined;
   num2 = "";
   resultDisplayed = true;
   }
})

clearButton.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    operatorSelected = undefined;
    display.textContent = "0";
    decimalButton.disabled = false;
})

deleteButton.addEventListener("click", () => {
    if (operatorSelected === undefined || operatorSelected === "√" ) {
       num1 = num1.slice(0, num1.length - 1);
       display.textContent = num1;
    }
    else {
        num2 = num2.slice(0, num2.length - 1);
       display.textContent = num1 + operatorSelected + num2;
    }
})

decimalButton.addEventListener("click", () => {
    if (operatorSelected === undefined) {
        num1 = num1 + decimalButton.textContent;
        display.textContent = num1;
        if (num1.includes(".")) {
            decimalButton.disabled = true;
        }
    } else if (operatorSelected) {
        num2 = num2 + decimalButton.textContent;
        display.textContent = num1 + operatorSelected + num2;
        if (num2.includes(".")) {
            decimalButton.disabled = true;
        }
    }})

document.addEventListener("keydown", (e) => {
    const digitKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const operatorKeys = ["+", "-", "*", "/"];
    if (e.key === "Enter") {
         if (num1.length === 0) {
        display.textContent = "0";
    }
    else if (operatorSelected === undefined) {
        display.textContent = num1;
    }
    else if (operatorSelected && num2.length === 0) {
    display.textContent = num1 + operatorSelected;
   } else {
   let result = operate(operatorSelected, num1, num2);
         if (result === Infinity) {
            display.textContent = "Division by Zero";
            num1 = "";
            operatorSelected = undefined;
            num2 = "";
            resultDisplayed = true;
            return;
        }
        if (result.toString().split(".")[1] !== undefined && result.toString().split(".")[1].length > 7) {
            result = +result.toFixed(7);
        }
        if (result.toString().length > 14) {
            display.textContent = result.toPrecision(10);
        } else {
            display.textContent = result;
        }
   num1 = result;
   operatorSelected = undefined;
   num2 = "";
   resultDisplayed = true;
   }
    }
    if (operatorKeys.includes(e.key)) {
         if (num2.length > 0) {
            const result = operate(operatorSelected, num1, num2);
            num1 = result;
            num2 = "";
        }
        let symbolToUse = e.key;
        if (symbolToUse === "*") {
            symbolToUse = "x";
        } else if (symbolToUse === "/") {
            symbolToUse = "÷";
        }
        operatorSelected = symbolToUse;
        if (num1.toString().length > 14) {
            display.textContent = num1.toPrecision(10) + operatorSelected;
        } else {
            display.textContent = num1 + operatorSelected;
        }
        resultDisplayed = false;
        decimalButton.disabled = false;
    }
    let digitClicked;
    if (digitKeys.includes(e.key)) {
        if (resultDisplayed) {
            num1 = "";
            digitClicked = e.key;
            updateNum1(digitClicked);
            resultDisplayed = false;
        }
        else if (operatorSelected === undefined || operatorSelected === "√") {
          digitClicked = e.key;
          updateNum1(digitClicked);
        } else {
            digitClicked = e.key;
            updateNum2(digitClicked);
        }
    }
    if (e.key === "Backspace") {
        if (operatorSelected === undefined || operatorSelected === "√" ) {
       num1 = num1.slice(0, num1.length - 1);
       display.textContent = num1;
    }
    else {
        num2 = num2.slice(0, num2.length - 1);
       display.textContent = num1 + operatorSelected + num2;
    }
    }
})