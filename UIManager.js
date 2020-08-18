import CalculatorParameters from './calculatorParameters.js';
import {
    operationManager
} from './operationManager.js';

export default class UIManager extends CalculatorParameters{
    constructor(calculator, keys, display, displayMini, operatorList) {
        super();
        this.calculator = calculator,
        this.keys = keys,
        this.display = display,
        this.displayMini = displayMini,
        this.operatorList = operatorList
    }
    eventHandler(event) {

        const actionKey = event.target.dataset.action;
        const operationOrExcuteKey = event.target.className;

        if (!actionKey || actionKey === "decimal") {
            //  Click on any number key (incl. decimal key) the AC button changes to CE.
            this.calculator.querySelector("button[data-action= 'clear']").innerHTML = "CE";
            this.display.innerHTML = super.numberManager(event.target.innerHTML);

        } else if (actionKey === "clear") {
            if (event.target.innerHTML === "CE") {
                super.clearEntry();
                this.display.innerHTML = 0;
                event.target.innerHTML = "AC";
            } else if (event.target.innerHTML === "AC") {
                super.allClear();
                this.display.innerHTML = 0;
                this.displayMini.innerHTML = "Display Previous Entry";
            }

        } else if (operationOrExcuteKey) {
            this.calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
            this.totalOperation(actionKey);
        } else {
            this.calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
            super.allClear();
            this.display.innerHTML = "err";
            this.displayMini.innerHTML = "Display Previous Entry";
        }
    };
    eventHandlerKeydown(event) {
        const operatorKeys = new Map([
            ["+", "add"],
            ["-", "subtract"],
            ["*", "multiply"],
            ["/", "divide"],
            ["Enter", "calculate"],
            ["Delete", "clear"]
        ]);
        const keyClicked = event.key;
        this.keys.forEach(key => {
            if (key.dataset.action && operatorKeys.get(keyClicked) && key.dataset.action === operatorKeys.get(keyClicked)) {
                //console.log("matched", key.dataset.action, operatorKeys.get(keyClicked));
                key.click();
                key.classList.add("keyPressed");
                setTimeout(() => key.classList.remove("keyPressed"), 100);
            } else if (keyClicked === key.innerHTML) {
                //console.log("matched", key.innerHTML, keyClicked);
                key.click();
                key.classList.add("keyPressed");
                setTimeout(() => key.classList.remove("keyPressed"), 100);
            };
        });
    }

    totalOperation(actionKey) {
        //calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
        if (this.strNumber === "") {
            //when +-/x was inserted first after a reset
            !(
                this.answer &&
                this.previousOperator &&
                this.operationBeforeCalculate &&
                this.globalConvertNumber
            ) &&
            (this.displayMini.innerHTML = `${this.display.innerHTML} ${this.operatorList[actionKey]}`);

            const displayNumber = parseFloat(this.display.innerHTML);

            this.previousOperator !== "calculate" &&
                ((this.operationBeforeCalculate = this.previousOperator),
                    (this.globalConvertNumber = parseFloat(this.display.innerHTML)));
            //display
            this.previousOperator && this.equalsEdgeCases(actionKey, displayNumber);
            this.previousOperator = actionKey;
        } else {
            //standard mathematical operation
            this.standardOperation(actionKey);
            this.operationBeforeCalculate = this.previousOperator;
            this.previousOperator = actionKey;
        }
        if (this.answer === "err"){
            this.calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
            super.allClear();
            this.displayMini.innerHTML = "Display Previous Entry";
        }
    }

    standardOperation(actionKey) {
        const convertNumber = parseFloat(this.strNumber);
        this.globalConvertNumber = convertNumber;
        if (this.previousOperator) {
            this.displayMini.innerHTML =
                this.previousOperator !== "calculate" ?
                `${this.answer} ${
              this.operatorList[this.previousOperator]
            } ${convertNumber}` :
                `${convertNumber} ${this.operatorList[actionKey]}`;

            this.answer = operationManager(
                this.previousOperator,
                this.answer,
                convertNumber
            );
        } else {
            this.displayMini.innerHTML = `${convertNumber} ${this.operatorList[actionKey]}`;
            this.answer = convertNumber;
        }    
        this.display.innerHTML = this.answer;
        this.strNumber = "";
    }

    anotherEqualsInput(displayNumber) {
        this.previousOperator !== "calculate" ?
            ((this.displayMini.innerHTML = `${displayNumber} ${
          this.operatorList[this.operationBeforeCalculate]
        } ${displayNumber}`),
                (this.answer = displayNumber),
                (this.answer = operationManager(
                    this.previousOperator,
                    displayNumber,
                    displayNumber
                ))) :
            (!this.operationBeforeCalculate &&
                (this.operationBeforeCalculate = "calculate"),
                //handling the case: initial input followed by =
                (this.displayMini.innerHTML =
                    this.operationBeforeCalculate === "calculate" ?
                    `${displayNumber} ${
                this.operatorList[this.operationBeforeCalculate]
              }` :
                    `${displayNumber} ${
                this.operatorList[this.operationBeforeCalculate]
              } ${this.globalConvertNumber}`),
                (this.answer = operationManager(
                    this.operationBeforeCalculate,
                    displayNumber,
                    this.globalConvertNumber
                )));
    }
    //equals handling
    equalsEdgeCases(actionKey, displayNumber) {
        actionKey === "calculate" ?
            this.anotherEqualsInput(displayNumber) :
            (this.displayMini.innerHTML = `${displayNumber} ${this.operatorList[actionKey]}`);

        this.display.innerHTML =this.answer;
    }

}