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
//equals testing part 2 is from line 64
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

})


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
    expect(calculatorUI.display.innerHTML).toMatch(new RegExp("24"));
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
     expect(calculatorUI.display.innerHTML).toMatch(new RegExp("23"));
     expect(calculatorUI.displayMini.innerHTML).toMatch("23 +");
 });


  // equals edge cases ...23 + = = => 23 + 23 + 23 = 69 calculate see below
    test('standard Operation i.e. 23 + = ', () => {
        const parameters = {
            answer: 23,
            strNumber: "",
            previousOperator: "calculate",
            operationBeforeCalculate: "add",
            globalConvertNumber: 23
        }
        const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
        expect(calculatorUI.equalsEdgeCases("calculate", 23)).toBe(46);
         expect(calculatorUI.display.innerHTML).toMatch(new RegExp("46"));
         expect(calculatorUI.displayMini.innerHTML).toMatch("23 +");
    });
  
// equals edgeCase assuming (23 + 1) = 24 => 24 + 1 =25
    test('assuming (23 + 1) = 24 => 24 + 1 =25 ', () => {
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


  //equals edgeCase 23 + = 46 
  test('standard Operation i.e. 23 + =  => 23 + 23 ', () => {
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
  test('assuming (23 + 1) = 24 => 24 + 1 =25 ', () => {
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
test('23 = = =  ', () => {
    const parameters = {
        answer: 0,
        strNumber: "",
        previousOperator: "calculate",
        operationBeforeCalculate: "calculate",
        globalConvertNumber: 23
    }
    const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList, parameters);
    expect(calculatorUI.anotherEqualsInput(23)).toBe(23);
    expect(calculatorUI.displayMini.innerHTML).toMatch("23 =");
});
