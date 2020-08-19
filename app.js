import CalculatorParameters from './calculatorParameters.js';
//import {operationManager} from './operationManager.js';
import UIManager from './UIManager.js';
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelectorAll("button");
const display = calculator.querySelector(".calculator__display");
const displayMini = calculator.querySelector(".calculator__display_mini");

const operators = [...calculator.querySelectorAll(".key--operator"), ...calculator.querySelectorAll(".key--equal")];
const operatorList = {};
operators.forEach(operator => operatorList[operator.dataset.action] = operator.innerHTML);
const parameters = new CalculatorParameters();
const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);

keys.forEach(key => {
    key.addEventListener('click', (e) => calculatorUI.eventHandler(e));
});
document.addEventListener('keydown', (e) => calculatorUI.eventHandlerKeydown(e));