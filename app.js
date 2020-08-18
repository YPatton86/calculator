//import CalculatorParameters from './calculatorParameters.js';
//import {operationManager} from './operationManager.js';
import UIManager from './UIManager.js';
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelectorAll("button");
const display = calculator.querySelector(".calculator__display");
const displayMini = calculator.querySelector(".calculator__display_mini");

const operators = [...calculator.querySelectorAll(".key--operator"), ...calculator.querySelectorAll(".key--equal")];
const operatorList = {};
operators.forEach(operator => operatorList[operator.dataset.action] = operator.innerHTML);
// const operatorList = {
//     add: "+",
//     subtract: "-",
//     multiply: "&times;",
//     divide: "/",
//     calculate: "=",
// }

// class UIManager {
//     constructor(calculator, keys, display, displayMini) {
//         this.calculator = calculator,
//             this.keys = keys,
//             this.display = display,
//             this.displayMini = displayMini
//         this.operatorList = operatorList
//     }
//     eventHandler(event) {

//         const actionKey = event.target.dataset.action;
//         const operationOrExcuteKey = event.target.className;

//         if (!actionKey || actionKey === "decimal") {
//             //  Click on any number key (incl. decimal key) the AC button changes to CE.
//             this.calculator.querySelector("button[data-action= 'clear']").innerHTML = "CE";
//             this.display.innerHTML = parameters.numberManager(event.target.innerHTML);

//         } else if (actionKey === "clear") {
//             if (event.target.innerHTML === "CE") {
//                 parameters.clearEntry();
//                 this.display.innerHTML = 0;
//                 event.target.innerHTML = "AC";
//             } else if (event.target.innerHTML === "AC") {
//                 parameters.allClear();
//                 this.display.innerHTML = 0;
//                 this.displayMini.innerHTML = "Display Previous Entry";
//             }

//         } else if (operationOrExcuteKey) {
//             this.calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
//             this.totalOperation(actionKey);
//         } else {
//             parameters.allClear();
//             this.display.innerHTML = "err";
//             this.displayMini.innerHTML = "Display Previous Entry";
//         }
//     };
//     eventHandlerKeydown(event) {
//         const operatorKeys = new Map([
//             ["+", "add"],
//             ["-", "subtract"],
//             ["*", "multiply"],
//             ["/", "divide"],
//             ["Enter", "calculate"],
//             ["Delete", "clear"]
//         ]);
//         const keyClicked = event.key;
//         this.keys.forEach(key => {
//             if (key.dataset.action && operatorKeys.get(keyClicked) && key.dataset.action === operatorKeys.get(keyClicked)) {
//                 //console.log("matched", key.dataset.action, operatorKeys.get(keyClicked));
//                 key.click();
//                 key.classList.add("keyPressed");
//                 setTimeout(() => key.classList.remove("keyPressed"), 100);
//             } else if (keyClicked === key.innerHTML) {
//                 //console.log("matched", key.innerHTML, keyClicked);
//                 key.click();
//                 key.classList.add("keyPressed");
//                 setTimeout(() => key.classList.remove("keyPressed"), 100);
//             };
//         });
//     }

//     totalOperation(actionKey) {
//         //calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
//         if (parameters.strNumber === "") {
//             //when +-/x was inserted first after a reset
//             !(
//                 parameters.answer &&
//                 parameters.previousOperator &&
//                 parameters.operationBeforeCalculate &&
//                 parameters.globalConvertNumber
//             ) &&
//             (this.displayMini.innerHTML = `${this.display.innerHTML} ${this.operatorList[actionKey]}`);

//             const displayNumber = parseFloat(this.display.innerHTML);

//             parameters.previousOperator !== "calculate" &&
//                 ((parameters.operationBeforeCalculate = parameters.previousOperator),
//                     (parameters.globalConvertNumber = parseFloat(this.display.innerHTML)));
//             //display
//             parameters.previousOperator && this.equalsEdgeCases(actionKey, displayNumber);
//             parameters.previousOperator = actionKey;
//         } else {
//             //standard mathematical operation
//             this.standardOperation(actionKey);
//             parameters.operationBeforeCalculate = parameters.previousOperator;
//             parameters.previousOperator = actionKey;
//         }
//     }

//     standardOperation(actionKey) {
//         const convertNumber = parseFloat(parameters.strNumber);
//         parameters.globalConvertNumber = convertNumber;
//         if (parameters.previousOperator) {
//             this.displayMini.innerHTML =
//                 parameters.previousOperator !== "calculate" ?
//                 `${parameters.answer} ${
//               this.operatorList[parameters.previousOperator]
//             } ${convertNumber}` :
//                 `${convertNumber} ${this.operatorList[actionKey]}`;

//             parameters.answer = operationManager(
//                 parameters.previousOperator,
//                 parameters.answer,
//                 convertNumber
//             );
//         } else {
//             this.displayMini.innerHTML = `${convertNumber} ${this.operatorList[actionKey]}`;
//             parameters.answer = convertNumber;
//         }
//         this.display.innerHTML = parameters.answer;
//         parameters.strNumber = "";
//     }

//     anotherEqualsInput(displayNumber) {
//         parameters.previousOperator !== "calculate" ?
//             ((this.displayMini.innerHTML = `${displayNumber} ${
//           this.operatorList[parameters.operationBeforeCalculate]
//         } ${displayNumber}`),
//                 (parameters.answer = displayNumber),
//                 (parameters.answer = operationManager(
//                     parameters.previousOperator,
//                     displayNumber,
//                     displayNumber
//                 ))) :
//             (!parameters.operationBeforeCalculate &&
//                 (parameters.operationBeforeCalculate = "calculate"),
//                 //handling the case: initial input followed by =
//                 (this.displayMini.innerHTML =
//                     parameters.operationBeforeCalculate === "calculate" ?
//                     `${displayNumber} ${
//                 this.operatorList[parameters.operationBeforeCalculate]
//               }` :
//                     `${displayNumber} ${
//                 this.operatorList[parameters.operationBeforeCalculate]
//               } ${parameters.globalConvertNumber}`),
//                 (parameters.answer = operationManager(
//                     parameters.operationBeforeCalculate,
//                     displayNumber,
//                     parameters.globalConvertNumber
//                 )));
//     }

//     //equals handling
//     equalsEdgeCases(actionKey, displayNumber) {
//         actionKey === "calculate" ?
//             this.anotherEqualsInput(displayNumber) :
//             (this.displayMini.innerHTML = `${displayNumber} ${this.operatorList[actionKey]}`);

//         this.display.innerHTML = parameters.answer;
//     }

// }

// //const parameters = new CalculatorParameters();
const calculatorUI = new UIManager(calculator, keys, display, displayMini, operatorList);

keys.forEach(key=> {
    key.addEventListener('click', (e) => calculatorUI.eventHandler(e));
});
document.addEventListener('keydown', (e) => calculatorUI.eventHandlerKeydown(e));

// class UIManager{

//     constructor(calculator, keys, display, displayMini){
//         this.calculator = calculator,
//         this.keys = keys,
//         this.display = display,
//         this.displayMini = displayMini
//         //this.operatorList = operatorList
//     }
//     eventHandler(event) {
//         const operatorList = {
//             add: "+",
//             subtract: "-",
//             multiply: "&times;",
//             divide: "/",
//             calculate: "=",
//         }
//         const actionKey = event.target.dataset.action;
//         const operationOrExcuteKey = event.target.className;

//         if (!actionKey || actionKey === "decimal") {
//             //  Click on any number key (incl. decimal key) the AC button changes to CE.
//             this.calculator.querySelector("button[data-action= 'clear']").innerHTML = "CE";
//             this.display.innerHTML = parameters.numberManager(event.target.innerHTML);

//         } else if (actionKey === "clear") {
//             if (event.target.innerHTML === "CE") {
//                 parameters.clearEntry();
//                 this.display.innerHTML = 0;
//                 event.target.innerHTML = "AC";
//             } else if (event.target.innerHTML === "AC") {
//                 parameters.allClear();
//                 this.display.innerHTML = 0;
//                 this.displayMini.innerHTML = "Display Previous Entry";
//             }

//         } else if (operationOrExcuteKey) {
//             this.calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
//             totalOperation(actionKey);
//         } else {
//             parameters.allClear();
//             this.display.innerHTML = "err";
//             this.displayMini.innerHTML = "Display Previous Entry";
//         }
//     };
//     eventHandlerKeydown(event) {
//         const operatorKeys = new Map([
//             ["+", "add"],
//             ["-", "subtract"],
//             ["*", "multiply"],
//             ["/", "divide"],
//             ["Enter", "calculate"],
//             ["Delete", "clear"]
//         ]);
//         const keyClicked = event.key;
//         this.keys.forEach(key => {
//             if (key.dataset.action && operatorKeys.get(keyClicked) && key.dataset.action === operatorKeys.get(keyClicked)) {
//                 //console.log("matched", key.dataset.action, operatorKeys.get(keyClicked));
//                 key.click();
//                 key.classList.add("keyPressed");
//                 setTimeout(() => key.classList.remove("keyPressed"), 100);
//             } else if (keyClicked === key.innerHTML) {
//                 //console.log("matched", key.innerHTML, keyClicked);
//                 key.click();
//                 key.classList.add("keyPressed");
//                 setTimeout(() => key.classList.remove("keyPressed"), 100);
//             };
//         });
//     }

//     totalOperation(actionKey) {
//         //calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
//         if (parameters.strNumber === "") {
//             //when +-/x was inserted first after a reset
//             !(
//                 parameters.answer &&
//                 parameters.previousOperator &&
//                 parameters.operationBeforeCalculate &&
//                 parameters.globalConvertNumber
//             ) &&
//             (this.displayMini.innerHTML = `${this.display.innerHTML} ${operatorList[actionKey]}`);

//             const displayNumber = parseFloat(this.display.innerHTML);

//             parameters.previousOperator !== "calculate" &&
//                 ((parameters.operationBeforeCalculate = parameters.previousOperator),
//                     (parameters.globalConvertNumber = parseFloat(this.display.innerHTML)));
//             //display
//             parameters.previousOperator && equalsEdgeCases(actionKey, displayNumber);
//             parameters.previousOperator = actionKey;
//         } else {
//             //standard mathematical operation
//             standardOperation(actionKey);
//             parameters.operationBeforeCalculate = parameters.previousOperator;
//             parameters.previousOperator = actionKey;
//         }
//     }

//     standardOperation(actionKey) {
//         const convertNumber = parseFloat(parameters.strNumber);
//         parameters.globalConvertNumber = convertNumber;
//         if (parameters.previousOperator) {
//             this.displayMini.innerHTML =
//                 parameters.previousOperator !== "calculate" ?
//                 `${parameters.answer} ${
//               operatorList[parameters.previousOperator]
//             } ${convertNumber}` :
//                 `${convertNumber} ${operatorList[actionKey]}`;

//             parameters.answer = operationManager(
//                 parameters.previousOperator,
//                 parameters.answer,
//                 convertNumber
//             );
//         } else {
//             this.displayMini.innerHTML = `${convertNumber} ${operatorList[actionKey]}`;
//             parameters.answer = convertNumber;
//         }
//         this.display.innerHTML = parameters.answer;
//         parameters.strNumber = "";
//     }

//     anotherEqualsInput(displayNumber) {
//         parameters.previousOperator !== "calculate" ?
//             ((this.displayMini.innerHTML = `${displayNumber} ${
//           operatorList[parameters.operationBeforeCalculate]
//         } ${displayNumber}`),
//                 (parameters.answer = displayNumber),
//                 (parameters.answer = operationManager(
//                     parameters.previousOperator,
//                     displayNumber,
//                     displayNumber
//                 ))) :
//             (!parameters.operationBeforeCalculate &&
//                 (parameters.operationBeforeCalculate = "calculate"),
//                 //handling the case: initial input followed by =
//                 (this.displayMini.innerHTML =
//                     parameters.operationBeforeCalculate === "calculate" ?
//                     `${displayNumber} ${
//                 operatorList[parameters.operationBeforeCalculate]
//               }` :
//                     `${displayNumber} ${
//                 operatorList[parameters.operationBeforeCalculate]
//               } ${parameters.globalConvertNumber}`),
//                 (parameters.answer = operationManager(
//                     parameters.operationBeforeCalculate,
//                     displayNumber,
//                     parameters.globalConvertNumber
//                 )));
//     }

//     //equals handling
//     equalsEdgeCases(actionKey, displayNumber) {
//         actionKey === "calculate" ?
//             anotherEqualsInput(displayNumber) :
//             (this.displayMini.innerHTML = `${displayNumber} ${operatorList[actionKey]}`);

//         this.display.innerHTML = parameters.answer;
//     }
    
// }
// function eventHandler(event){

//     const actionKey = event.target.dataset.action;
//     const operationOrExcuteKey = event.target.className;

//     if (!actionKey || actionKey === "decimal") {
//         //  Click on any number key (incl. decimal key) the AC button changes to CE.
//         calculator.querySelector("button[data-action= 'clear']").innerHTML = "CE";
//         display.innerHTML = parameters.numberManager(event.target.innerHTML);

//     } else if (actionKey === "clear") {
//         if (event.target.innerHTML === "CE"){
//             parameters.clearEntry();
//             display.innerHTML = 0;
//             event.target.innerHTML = "AC";
//         } else if (event.target.innerHTML === "AC") {
//             parameters.allClear();
//             display.innerHTML = 0;
//             displayMini.innerHTML = "Display Previous Entry";
//         } 

//     } else if (operationOrExcuteKey) {
//         calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
//         totalOperation(actionKey);
//     } else {
//         parameters.allClear();
//         display.innerHTML = "err";
//         displayMini.innerHTML = "Display Previous Entry";
//     }
// };

// function eventHandlerKeydown(event) {
//     const operatorKeys = new Map([
//         ["+", "add"],
//         ["-", "subtract"],
//         ["*", "multiply"],
//         ["/", "divide"],
//         ["Enter", "calculate"],
//         ["Delete", "clear"]
//     ]);
//     const keyClicked = event.key;
//     keys.forEach(key => {
//         if (key.dataset.action && operatorKeys.get(keyClicked) && key.dataset.action === operatorKeys.get(keyClicked)) {
//             //console.log("matched", key.dataset.action, operatorKeys.get(keyClicked));
//             key.click();
//             key.classList.add("keyPressed");
//             setTimeout(() => key.classList.remove("keyPressed"), 100);
//         } else if (keyClicked === key.innerHTML) {
//             //console.log("matched", key.innerHTML, keyClicked);
//             key.click();  
//             key.classList.add("keyPressed");
//             setTimeout(() => key.classList.remove("keyPressed"), 100);
//         };
//     });
// }

//   function totalOperation(actionKey) {
//     //calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
//     if (parameters.strNumber === "") {
//       //when +-/x was inserted first after a reset
//       !(
//         parameters.answer &&
//         parameters.previousOperator &&
//         parameters.operationBeforeCalculate &&
//         parameters.globalConvertNumber
//       ) &&
//         (displayMini.innerHTML = `${display.innerHTML} ${operatorList[actionKey]}`);

//       const displayNumber = parseFloat(display.innerHTML);

//       parameters.previousOperator !== "calculate" &&
//         ((parameters.operationBeforeCalculate = parameters.previousOperator),
//         (parameters.globalConvertNumber = parseFloat(display.innerHTML)));
//         //display
//       parameters.previousOperator && equalsEdgeCases(actionKey, displayNumber);
//       parameters.previousOperator = actionKey;
//     } else {
//       //standard mathematical operation
//       standardOperation(actionKey);
//       parameters.operationBeforeCalculate = parameters.previousOperator;
//       parameters.previousOperator = actionKey;
//     }
//   }

// function standardOperation(actionKey) {
//     const convertNumber = parseFloat(parameters.strNumber);
//     parameters.globalConvertNumber = convertNumber;
//     if (parameters.previousOperator) {
//       displayMini.innerHTML =
//         parameters.previousOperator !== "calculate"
//           ? `${parameters.answer} ${
//               operatorList[parameters.previousOperator]
//             } ${convertNumber}`
//           : `${convertNumber} ${operatorList[actionKey]}`;

//       parameters.answer = operationManager(
//         parameters.previousOperator,
//         parameters.answer,
//         convertNumber
//       );
//     } else {
//       displayMini.innerHTML = `${convertNumber} ${operatorList[actionKey]}`;
//       parameters.answer = convertNumber;
//     }
//     display.innerHTML = parameters.answer;
//     parameters.strNumber = "";
//   }
  
//   function anotherEqualsInput(displayNumber) {
//     parameters.previousOperator !== "calculate"
//       ? ((displayMini.innerHTML = `${displayNumber} ${
//           operatorList[parameters.operationBeforeCalculate]
//         } ${displayNumber}`),
//         (parameters.answer = displayNumber),
//         (parameters.answer = operationManager(
//           parameters.previousOperator,
//           displayNumber,
//           displayNumber
//         )))
//       : (!parameters.operationBeforeCalculate &&
//           (parameters.operationBeforeCalculate = "calculate"),
//         //handling the case: initial input followed by =
//         (displayMini.innerHTML =
//           parameters.operationBeforeCalculate === "calculate"
//             ? `${displayNumber} ${
//                 operatorList[parameters.operationBeforeCalculate]
//               }`
//             : `${displayNumber} ${
//                 operatorList[parameters.operationBeforeCalculate]
//               } ${parameters.globalConvertNumber}`),
//         (parameters.answer = operationManager(
//           parameters.operationBeforeCalculate,
//           displayNumber,
//           parameters.globalConvertNumber
//         )));
//   }

// //equals handling
//   function  equalsEdgeCases(actionKey, displayNumber) {
//     actionKey === "calculate"
//       ? anotherEqualsInput(displayNumber)
//       : (displayMini.innerHTML = `${displayNumber} ${operatorList[actionKey]}`);

//     display.innerHTML = parameters.answer;
//   }