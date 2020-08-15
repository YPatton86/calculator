const calculator = document.querySelector('.calculator');
const keys = calculator.querySelectorAll("button");
const display = calculator.querySelector(".calculator__display");
const displayMini = calculator.querySelector(".calculator__display_mini");

const operators = [...calculator.querySelectorAll(".key--operator"), ...calculator.querySelectorAll(".key--equal")];
const operatorList = {};
operators.forEach(operator =>operatorList[operator.dataset.action] = operator.innerHTML);


let answer = null;
let strNumber ="";
let previousOperator = "";
//may not use
let operationBeforeCalculate = "";
let globalConvertNumber= null;

keys.forEach(key=> {
    key.addEventListener('click', eventHandler);
});

function eventHandler(event){

    const actionKey = event.target.dataset.action;
    const operationOrExcuteKey = event.target.className;

    if (!actionKey || actionKey === "decimal") {
        //  Click on any number key (incl. decimal key) the AC button changes to CE.
        calculator.querySelector("button[data-action= 'clear']").innerHTML = "CE";
        numberManager(event.target.innerHTML);

    } else if (actionKey === "clear") {
        ceAcManager(event.target.innerHTML);

    } else if (operationOrExcuteKey) {
        calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
        totalOperation(actionKey);

    } else {
        clearOrError(false);
    }
}



// numbers section
function numberManager(input){
    calculator.querySelector("button[data-action= 'clear']").innerHTML = "CE";
    strNumber = strNumber.concat(input);
    
    // 0 typo handling (edge case)
    (strNumber === ".") && (strNumber = "0.");
    if (!Number(strNumber) && Number(strNumber) !== 0 || strNumber[0] === "0" && strNumber[1] !== ".") {
        //clearOrError(false);
        strNumber = parseFloat(strNumber).toString();
    }
    display.innerHTML = strNumber;
}

//AC/CE section
function ceAcManager(CEorAC){
    (CEorAC === "CE") ? (
        // only the current entry is deleted i.e. previous operator is still effective ... => 15 + 24 delete 24 => 15 + (new entry needed)
        strNumber = "",
        display.innerHTML = 0,
        CEorAC = "AC"
    ):(
        clearOrError()
    );
}

function clearOrError(clear=true){
    display.innerHTML = clear ? 0 : "err";
    displayMini.innerHTML = "Display Previous Entry";
    answer = null;
    strNumber = "";
    previousOperator = "";
    // may not use
    operationBeforeCalculate = "";
    globalConvertNumber = null;
}

//Operators section
//Overall Operation (handle every mathematical operations)
function totalOperation(actionKey){
    //calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
        if (strNumber === "") {

            (previousOperator !== "calculate") && (operationBeforeCalculate = previousOperator);
            (previousOperator) && equalEdgeCases(previousOperator, actionKey);
            previousOperator = actionKey;

        } else {

            const convertNumber = parseFloat(strNumber);
            globalConvertNumber = convertNumber;
            //standard mathematical operation
            answer = standardOperation(previousOperator, actionKey, answer, convertNumber);
            display.innerHTML = answer;
            strNumber = '';
            operationBeforeCalculate = previousOperator;
            previousOperator = actionKey;

        }
};



//standard methamtical operation
function operationManager(previousOperator, answer, convertNumber) {
    switch (previousOperator) {
        case "add":
            return answer + convertNumber;
        case "subtract":
            return answer - convertNumber;
        case "multiply":
            return answer * convertNumber;
        case "divide":
            return answer / convertNumber;
        case "calculate":
            if (convertNumber) {
                return convertNumber;
            }
            return answer;
        default:
            clearOrError(false);
    }
}

function standardOperation(previousOperator, actionKey, answer, convertNumber) {
    if (previousOperator) {

        displayMini.innerHTML = (previousOperator !== "calculate") ? (
            `${answer} ${operatorList[previousOperator]} ${convertNumber}`
        ) : (
            `${convertNumber} ${operatorList[actionKey]}`
        );
        answer = operationManager(previousOperator, answer, convertNumber);

    } else {

        displayMini.innerHTML = `${convertNumber} ${operatorList[actionKey]}`;
        answer = convertNumber;
    }
    return answer;
}



//equals handling
function equalEdgeCases(previousOperator, actionKey){
    const displayNumber = parseFloat(display.innerHTML);
    (actionKey === "calculate") ? (
            anotherEqualsInputs(previousOperator, displayNumber)
        ):(
            displayMini.innerHTML = `${displayNumber} ${operatorList[actionKey]}`
        );

    display.innerHTML = answer;
}

function anotherEqualsInputs(previousOperator, displayNumber){
    (previousOperator!=="calculate") ? (

        displayMini.innerHTML = `${displayNumber} ${operatorList[operationBeforeCalculate]} ${displayNumber}`,
        answer = operationManager(previousOperator, displayNumber, displayNumber)
    ):(
        (!operationBeforeCalculate) && (operationBeforeCalculate = "calculate"),

        //handling the case: initial input followed by =
        displayMini.innerHTML = (operationBeforeCalculate === "calculate") ? (
            `${displayNumber} ${operatorList[operationBeforeCalculate]}`
        ):(
            `${displayNumber} ${operatorList[operationBeforeCalculate]} ${globalConvertNumber}`
        ),
        answer = operationManager(operationBeforeCalculate, displayNumber, globalConvertNumber)
    );
};

