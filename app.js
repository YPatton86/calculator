const calculator = document.querySelector('.calculator');
const keys = calculator.querySelectorAll("button");
const display = calculator.querySelector(".calculator__display");
const displayMini = calculator.querySelector(".calculator__display_mini");

const operators = [...calculator.querySelectorAll(".key--operator"), ...calculator.querySelectorAll(".key--equal")];
const operatorList = {};
operators.forEach(operator =>operatorList[operator.dataset.action] = operator.innerHTML);

class calculatorFunction {
    constructor(){
        this.answer = 0;
        this.strNumber = "";
        this.previousOperator = "";
        this.operationBeforeCalculate = "";
        this.globalConvertNumber = 0;
    }

    numberManager(input) {
        calculator.querySelector("button[data-action= 'clear']").innerHTML = "CE";
        this.strNumber = this.strNumber.concat(input);

        // 0 typo handling (edge case)
        (this.strNumber === ".") && (this.strNumber = "0.");
        if (!Number(this.strNumber) && Number(this.strNumber) !== 0 || this.strNumber[0] === "0" && this.strNumber[1] !== ".") {
            //clearOrError(false);
            this.strNumber = parseFloat(this.strNumber).toString();
        }
        display.innerHTML = this.strNumber;
    }

    ceAcManager(CEorAC) {
        (CEorAC === "CE") ? (
            // only the current entry is deleted i.e. previous operator is still effective ... => 15 + 24 delete 24 => 15 + (new entry needed)
            this.strNumber = "",
            display.innerHTML = 0,
            CEorAC = "AC"
        ) : (
            this.clearOrError()
        );
    }

    clearOrError(clear = true) {
        display.innerHTML = clear ? 0 : "err";
        displayMini.innerHTML = "Display Previous Entry";
        this.answer = 0;
        this.strNumber = "";
        this.previousOperator = "";
        this.operationBeforeCalculate = "";
        this.globalConvertNumber = 0;
    }

    //Operators section
    //Overall Operation (handle every mathematical operations)
    totalOperation(actionKey) {
        //calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
        if (this.strNumber === "") {
            // when +-/x was inserted first after a reset
            (!this.previousOperator) && (displayMini.innerHTML = `${display.innerHTML} ${operatorList[actionKey]}`);
            // console.log("I'm here!");
            (this.previousOperator !== "calculate") && (this.operationBeforeCalculate = this.previousOperator);
            (this.previousOperator) && this.equalsEdgeCases(actionKey);
            this.previousOperator = actionKey;

        } else {
            //standard mathematical operation
            this.standardOperation(actionKey);
            this.operationBeforeCalculate = this.previousOperator;
            this.previousOperator = actionKey;

        }
    };



    //standard methamtical operation
    operationManager(prevOp, ans, convertNum) {
        switch (prevOp) {
            case "add":
                return ans + convertNum;
            case "subtract":
                return ans - convertNum;
            case "multiply":
                return ans * convertNum;
            case "divide":
                return ans / convertNum;
            case "calculate":
                if (convertNum) {
                    return convertNum;
                }
                return ans;
            default:
                this.clearOrError(false);
        }
    }

    standardOperation(actionKey) {
        const convertNumber = parseFloat(this.strNumber);
        this.globalConvertNumber = convertNumber;
        if (this.previousOperator) {

            displayMini.innerHTML = (this.previousOperator !== "calculate") ? (
                `${this.answer} ${operatorList[this.previousOperator]} ${convertNumber}`
            ) : (
                `${convertNumber} ${operatorList[actionKey]}`
            );
            this.answer = this.operationManager(this.previousOperator, this.answer, convertNumber);

        } else {

            displayMini.innerHTML = `${convertNumber} ${operatorList[actionKey]}`;
            this.answer = convertNumber;
        }
        display.innerHTML = this.answer;
        this.strNumber = '';
    }

    //equals handling
    equalsEdgeCases(actionKey) {
        const displayNumber = parseFloat(display.innerHTML);
        (actionKey === "calculate") ? (
            this.anotherEqualsInput(displayNumber)
        ) : (
            displayMini.innerHTML = `${displayNumber} ${operatorList[actionKey]}`
        );

        display.innerHTML = this.answer;
    }

    anotherEqualsInput(displayNumber) {
        (this.previousOperator !== "calculate") ? (

            displayMini.innerHTML = `${displayNumber} ${operatorList[this.operationBeforeCalculate]} ${displayNumber}`,
            this.answer = this.operationManager(this.previousOperator, displayNumber, displayNumber)
        ) : (
            (!this.operationBeforeCalculate) && (this.operationBeforeCalculate = "calculate"),

            //handling the case: initial input followed by =
            displayMini.innerHTML = (this.operationBeforeCalculate === "calculate") ? (
                `${displayNumber} ${operatorList[this.operationBeforeCalculate]}`
            ) : (
                `${displayNumber} ${operatorList[this.operationBeforeCalculate]} ${this.globalConvertNumber}`
            ),
            this.answer = this.operationManager(this.operationBeforeCalculate, displayNumber, this.globalConvertNumber)
        );
    };

}

const clickCalculator = new calculatorFunction();

keys.forEach(key=> {
    key.addEventListener('click', eventHandler);
});
 
function eventHandler(event){

    const actionKey = event.target.dataset.action;
    const operationOrExcuteKey = event.target.className;

    if (!actionKey || actionKey === "decimal") {
        //  Click on any number key (incl. decimal key) the AC button changes to CE.
        //calculator.querySelector("button[data-action= 'clear']").innerHTML = "CE";
        clickCalculator.numberManager(event.target.innerHTML);

    } else if (actionKey === "clear") {
        clickCalculator.ceAcManager(event.target.innerHTML);

    } else if (operationOrExcuteKey) {
        calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
        clickCalculator.totalOperation(actionKey);

    } else {
        clickCalculator.clearOrError(false);
    }
};

//document.addEventListener('keypress', eventHandlerKeydown);
// function eventHandlerKeydown(event){
//     const keyClicked= event.key;
//     //const actionKey = .dataset.action.innerHTML;
//     //const operationOrExcuteKey = event.target.className;
//     console.log(keyCicked);
//     if(actionKey==keyClicked) {
//     console.log(actionKey);
//     }
// }


