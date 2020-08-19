import {operationManager} from "./operationManager.js"
export default class UIManager{
    constructor(calculator, keys, display, displayMini, operatorList, parameters) {
        this.calculator = calculator,
        this.keys = keys,
        this.display = display,
        this.displayMini = displayMini,
        this.operatorList = operatorList,
        this.parameters = parameters
    }

    eventHandler(event) {
        const actionKey = event.target.dataset.action;
        const operationOrExcuteKey = event.target.className;

        if (!actionKey || actionKey === "decimal") {
            //  Click on any number key (incl. decimal key) the AC button changes to CE.
            this.calculator.querySelector("button[data-action= 'clear']").innerHTML = "CE";
            this.display.innerHTML = this.parameters.numberManager(event.target.innerHTML);

        } else if (actionKey === "clear") {
            if (event.target.innerHTML === "CE") {
                this.parameters.clearEntry();
                this.display.innerHTML = 0;
                event.target.innerHTML = "AC";
            } else if (event.target.innerHTML === "AC") {
                this.parameters.allClear();
                this.display.innerHTML = 0;
                this.displayMini.innerHTML = "Display Previous Entry";
            }

        } else if (operationOrExcuteKey) {
            this.calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
            this.totalOperation(actionKey);
        } else {
            //safety net just in case
            this.calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
            this.parameters.allClear();
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
        if (this.parameters.strNumber === "") {
            //when +-/x is inserted first after a reset
            !(
                this.parameters.answer &&
                this.parameters.previousOperator &&
                this.parameters.operationBeforeCalculate &&
                this.parameters.globalConvertNumber
            ) &&
            (this.displayMini.innerHTML = `${this.display.innerHTML} ${this.operatorList[actionKey]}`);

            const displayNumber = parseFloat(this.display.innerHTML);

            this.parameters.previousOperator !== "calculate" &&
                ((this.parameters.operationBeforeCalculate = this.parameters.previousOperator),
                    (this.parameters.globalConvertNumber = parseFloat(this.display.innerHTML)));
            //Equals edge cases 
            this.parameters.previousOperator && this.equalsEdgeCases(actionKey, displayNumber);
            this.parameters.previousOperator = actionKey;
        } else {
            //standard mathematical operation
            this.standardOperation(actionKey);
            this.parameters.operationBeforeCalculate = this.parameters.previousOperator;
            this.parameters.previousOperator = actionKey;
        }
        if (this.parameters.answer === "err"){
            //safety net
            this.calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
            this.parameters.allClear();
            this.displayMini.innerHTML = "Display Previous Entry";
        }
    }

    standardOperation(actionKey) {
        const convertNumber = parseFloat(this.parameters.strNumber);
        this.parameters.globalConvertNumber = convertNumber;
        
        if (this.parameters.previousOperator) {
            this.displayMini.innerHTML =
                this.parameters.previousOperator !== "calculate" ?
                `${this.parameters.answer} ${
              this.operatorList[this.parameters.previousOperator] // n1 operator n2 e.g. number1 + number2  
            } ${convertNumber}` :
                `${convertNumber} ${this.operatorList[actionKey]}`; // (previour Operator , =) n2 operator, e.g. number + (symbol)

            this.parameters.answer = operationManager(
                this.parameters.previousOperator,
                this.parameters.answer,
                convertNumber
            );
        } else { // no previous operator
            this.displayMini.innerHTML = `${convertNumber} ${this.operatorList[actionKey]}`;
            this.parameters.answer = convertNumber;
        }    
        this.display.innerHTML = this.parameters.answer;
        this.parameters.strNumber = "";
        return this.parameters.answer;
    }

    anotherEqualsInput(displayNumber) {
        this.parameters.previousOperator !== "calculate" ?
            ((this.displayMini.innerHTML = `${displayNumber} ${
          this.operatorList[this.parameters.operationBeforeCalculate]} ${displayNumber}`),
                (this.parameters.answer = displayNumber),
                (this.parameters.answer = operationManager(
                    this.parameters.previousOperator,
                    displayNumber,
                    displayNumber
                ))) :
            (!this.parameters.operationBeforeCalculate &&
                (this.parameters.operationBeforeCalculate = "calculate"),
                //handling the case: initial input followed by =
                (this.displayMini.innerHTML =
                    this.parameters.operationBeforeCalculate === "calculate" ?
                    `${displayNumber} ${ this.operatorList[this.parameters.operationBeforeCalculate]}`
                :`${displayNumber} ${ this.operatorList[this.parameters.operationBeforeCalculate]} ${this.parameters.globalConvertNumber}`),
                (this.parameters.answer = operationManager(
                    this.parameters.operationBeforeCalculate,
                    displayNumber,
                    this.parameters.globalConvertNumber)
                )
            );
            return this.parameters.answer;
    }
    //equals handling
    equalsEdgeCases(actionKey, displayNumber) {
        actionKey === "calculate" ?
            this.anotherEqualsInput(displayNumber) :
            (this.displayMini.innerHTML = `${displayNumber} ${this.operatorList[actionKey]}`);

        this.display.innerHTML = this.parameters.answer;
        return this.parameters.answer;
    }

}