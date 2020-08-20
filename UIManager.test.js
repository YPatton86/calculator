import UIManager from "./UIManager.js";
import { JestEnvironment } from "@jest/environment";
import { jsxEmptyExpression, exportAllDeclaration } from "@babel/types";
import JestMock from "jest-mock";
import path from "path";
import fs from "fs";
const html =
    fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
//import CalculatorParameters from './calculatorParameters.js';
import {
    operationManager
} from './operationManager.js';
//Dom related equals testing and DOM testing
let calculator;
let keys;
let display;
let displayMini;
let operatorList
beforeEach(()=>{
    document.documentElement.innerHTML = html.toString();
    calculator = document.querySelector('.calculator');
    keys = calculator.querySelectorAll("button");
    display = calculator.querySelector(".calculator__display");
    displayMini = calculator.querySelector(".calculator__display_mini");
    const operators = [...calculator.querySelectorAll(".key--operator"), ...calculator.querySelectorAll(".key--equal")];
    operatorList = {};
    operators.forEach(operator => operatorList[operator.dataset.action] = operator.innerHTML);

});


//Total peration 2 patterns  1+23 = 24, 23 +,
test('Total Operation i.e. 1+23 = 24 ', () => {
    const parameters = {
        answer: 1,
        strNumber: "23",
        previousOperator: "add",
        operationBeforeCalculate: "calculate",
        globalConvertNumber: 1
    }
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    //const string1 = "1 + 23";
    expect(calculatorUI.totalOperation("calculate")).toBe(24);
    expect(calculatorUI.display.innerHTML).toMatch("24");
    expect(calculatorUI.displayMini.innerHTML).toMatch("1 + 23");
});

test('Total Operation i.e. 23+ ', () => {
    const parameters = {
        answer: 1,
        strNumber: "23",
        previousOperator: "calculate",
        operationBeforeCalculate: "add",
        globalConvertNumber: 1
    }
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    expect(calculatorUI.totalOperation("add")).toBe(23);
    expect(calculatorUI.display.innerHTML).toMatch("23");
    expect(calculatorUI.displayMini.innerHTML).toMatch("23 +");
});

test('Total Operation equalsEdgeCases i.e. 23 + = => 23 + 23 ', () => {
    const parameters = {
        answer: 23,
        strNumber: "",
        previousOperator: "calculate",
        operationBeforeCalculate: "add",
        globalConvertNumber: 23
    }
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    calculatorUI.display.innerHTML = "23";
    expect(calculatorUI.totalOperation("calculate")).toBe(46);
    expect(calculatorUI.display.innerHTML).toMatch("46");
    expect(calculatorUI.displayMini.innerHTML).toMatch("23 +");
});

test('Total Operation equalsEdgeCases assuming (23 + 1) = 24 => 24 + 1 =25 ', () => {
    const parameters = {
        answer: 24,
        strNumber: "",
        previousOperator: "calculate",
        operationBeforeCalculate: "add",
        globalConvertNumber: 1
    }
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    calculatorUI.display.innerHTML = "24";
    expect(calculatorUI.totalOperation("calculate")).toBe(25);
    expect(calculatorUI.displayMini.innerHTML).toMatch("24 + 1");
});

test('Total Operation equalsEdgeCases, initial input followed by =, 23 = =  ', () => {
    const parameters = {
        answer: 0,
        strNumber: "",
        previousOperator: "calculate",
        operationBeforeCalculate: "",
        globalConvertNumber: 23
    }
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    calculatorUI.display.innerHTML = "23";
    expect(calculatorUI.totalOperation("calculate")).toBe(23);
    expect(calculatorUI.displayMini.innerHTML).toMatch("23 =");
});

//Standard Operation 2 patterns  1+23 = 24, 23 +,   
test('standard Operation i.e. 1+23 = 24 ', ()=>{
    const parameters = {
        answer: 1,
        strNumber: "23",
        previousOperator: "add",
        operationBeforeCalculate: "calculate",
        globalConvertNumber: 1
    }
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    //const string1 = "1 + 23";
    expect(calculatorUI.standardOperation("calculate")).toBe(24);
    expect(calculatorUI.display.innerHTML).toMatch("24");
    expect(calculatorUI.displayMini.innerHTML).toMatch("1 + 23");
 });


 test('standard Operation i.e. 23+ ', () => {
     const parameters = {
         answer: 1,
         strNumber: "23",
         previousOperator: "calculate",
         operationBeforeCalculate: "add",
         globalConvertNumber: 1
     }
     const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
     expect(calculatorUI.standardOperation("add")).toBe(23);
     expect(calculatorUI.display.innerHTML).toMatch("23");
     expect(calculatorUI.displayMini.innerHTML).toMatch("23 +");
 });


  // equals edge cases ...23 + = = => 23 + 23 + 23 = 69 calculate see below
test('equalsEdgeCases i.e. 23 + = => 23 + 23 ', () => {
    const parameters = {
        answer: 23,
        strNumber: "",
        previousOperator: "calculate",
        operationBeforeCalculate: "add",
        globalConvertNumber: 23
    }
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    expect(calculatorUI.equalsEdgeCases("calculate", 23)).toBe(46);
        expect(calculatorUI.display.innerHTML).toMatch("46");
        expect(calculatorUI.displayMini.innerHTML).toMatch("23 +");
});

// equals edgeCase assuming (23 + 1) = 24 => 24 + 1 =25
test('equalsEdgeCases assuming (23 + 1) = 24 => 24 + 1 =25 ', () => {
    const parameters = {
        answer: 24,
        strNumber: "",
        previousOperator: "calculate",
        operationBeforeCalculate: "add",
        globalConvertNumber: 1
    }
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    expect(calculatorUI.equalsEdgeCases("calculate", 24)).toBe(25);
    expect(calculatorUI.displayMini.innerHTML).toMatch("24 + 1");
});

// equals edgeCase assuming, initial input followed by =
test('equalsEdgeCases initial input followed by =, 23 = =   ', () => {
const parameters = {
    answer: 0,
    strNumber: "",
    previousOperator: "calculate",
    operationBeforeCalculate: "",
    globalConvertNumber: 23
}
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    expect(calculatorUI.equalsEdgeCases("calculate", 23)).toBe(23);
    expect(calculatorUI.displayMini.innerHTML).toMatch("23 =");
});

  //equals edgeCase 23 + = 46 
test('anotherEqualsInput i.e. 23 + =  => 23 + 23 ', () => {
    const parameters = {
        answer: 23,
        strNumber: "",
        previousOperator: "calculate",
        operationBeforeCalculate: "add",
        globalConvertNumber: 23
    }
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    expect(calculatorUI.anotherEqualsInput(23)).toBe(46);
    expect(calculatorUI.displayMini.innerHTML).toMatch("23 + 23");
});
// equals edgeCase assuming (23 + 1) = 24 => 24 + 1 =25
test('anotherEqualsInput assuming (23 + 1) = 24 => 24 + 1 =25 ', () => {
    const parameters = {
        answer: 24,
        strNumber: "",
        previousOperator: "calculate",
        operationBeforeCalculate: "add",
        globalConvertNumber: 1
    }
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    expect(calculatorUI.anotherEqualsInput(24)).toBe(25);
    expect(calculatorUI.displayMini.innerHTML).toMatch("24 + 1");
});

// equals edgeCase assuming, initial input followed by =
test('anotherEqualsInput, initial input followed by =, 23 = =  ', () => {
    const parameters = {
        answer: 0,
        strNumber: "",
        previousOperator: "calculate",
        operationBeforeCalculate: "",
        globalConvertNumber: 23
    }
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    expect(calculatorUI.anotherEqualsInput(23)).toBe(23);
    expect(calculatorUI.displayMini.innerHTML).toMatch("23 =");
});
