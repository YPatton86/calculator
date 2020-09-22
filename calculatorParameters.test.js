import CalculatorParameters from "./calculatorParameters.js";
import { exportAllDeclaration } from "@babel/types";
import { exception } from "console";
//decimal and other number edge cases, clear entry and  all clear 

//let parameters;
// beforeEach(()=>{
//     const parameters = new CalculatorParameters();

// });
test("Test CE then AC, everything should be deleted", () => {
    const parameters = new CalculatorParameters();
    parameters.answer = 2;
    parameters.strNumber = "232";
    parameters.previousOperator = "add";
    parameters.operationBeforeCalculate = "multiply";
    parameters.globalConvertNumber = 2;
    parameters.clearEntry();
    expect(parameters.answer).toBe(2);
    expect(parameters.strNumber).toBe("");
    expect(parameters.previousOperator).toBe("add");
    expect(parameters.operationBeforeCalculate).toBe("multiply");
    expect(parameters.globalConvertNumber).toBe(2);
    parameters.strNumber = "511";
    parameters.allClear();
    expect(parameters.answer).toBe(0);
    expect(parameters.strNumber).toBe("");
    expect(parameters.previousOperator).toBe("");
    expect(parameters.operationBeforeCalculate).toBe("");
    expect(parameters.globalConvertNumber).toBe(0);
});
test("Test CE then AC, everything should be deleted", () => {
    const parameters = new CalculatorParameters();
    parameters.answer = 10;
    parameters.strNumber = "0";
    parameters.previousOperator = "subtract";
    parameters.operationBeforeCalculate = "calculate";
    parameters.globalConvertNumber = 10;
    parameters.clearEntry();
    expect(parameters.answer).toBe(10);
    expect(parameters.strNumber).toBe("");
    expect(parameters.previousOperator).toBe("subtract");
    expect(parameters.operationBeforeCalculate).toBe("calculate");
    expect(parameters.globalConvertNumber).toBe(10);
    parameters.strNumber = "2.12";
    parameters.allClear();
    expect(parameters.answer).toBe(0);
    expect(parameters.strNumber).toBe("");
    expect(parameters.previousOperator).toBe("");
    expect(parameters.operationBeforeCalculate).toBe("");
    expect(parameters.globalConvertNumber).toBe(0);
});

test("Decimal testing '00.120', '.120', '0.120', all should be '0.120'", () =>{
    const parameters = new CalculatorParameters();
    const array1 = ["0","0",".","1","2","0"];
    for(let i=0; i < array1.length;i++){
        parameters.numberManager(array1[i])
    };
    expect(parameters.strNumber).toBe("0.120");
    parameters.strNumber="";
    const array2 = [".", "1", "2","0"];
    for (let i = 0; i < array2.length; i++) {
        parameters.numberManager(array2[i])
    };
    expect(parameters.strNumber).toBe("0.120");
    parameters.strNumber = "";
    const array3 = ["0", ".", "1", "2","0"];
    for (let i = 0; i < array3.length; i++) {
        parameters.numberManager(array3[i])
    };
    expect(parameters.strNumber).toBe("0.120");
});
test("Decimal and other number edge cases, 0.12.0 => 0.120 (remove the second and more decimals), 0012.0 => 12.0 ", () => {
    const parameters = new CalculatorParameters();
    const array1 = ["0", ".", "1", "2",".", "0"];
    for (let i = 0; i < array1.length; i++) {
        parameters.numberManager(array1[i])
    };
    expect(parameters.strNumber).toBe("0.120");
    parameters.strNumber = "";
    const array2 = ["0", ".", "1", "2", ".", "."];
    for (let i = 0; i < array2.length; i++) {
        parameters.numberManager(array2[i])
    };
    expect(parameters.strNumber).toBe("0.12");
    parameters.strNumber = "";
    const array3 = ["0","0",".", "1", "2","0"];
    for (let i = 0; i < array3.length; i++) {
        parameters.numberManager(array3[i])
    };
    expect(parameters.strNumber).toBe("0.120");
});

