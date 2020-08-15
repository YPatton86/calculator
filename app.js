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
    key.addEventListener('click', function(event){
        const actionKey = event.target.dataset.action;
        const operationOrExcuteKey = event.target.className;
        if (!actionKey || actionKey === "decimal"){

            calculator.querySelector("button[data-action= 'clear']").innerHTML = "CE";
            strNumber = strNumber.concat(event.target.innerHTML);

            // 0 typo handling (edge case)
            if(strNumber === ".") strNumber = "0.";
            if (!Number(strNumber) && Number(strNumber) !== 0 || strNumber[0] === "0" && strNumber[1] !== ".") {
                //clearOrError(false);
                strNumber = parseFloat(strNumber).toString();
            } 

            display.innerHTML = strNumber;

        } else if (actionKey === "clear") {
            if(event.target.innerHTML==="CE"){
                // only the current entry is deleted i.e. previous operator is still effective ... => 15 + 24 delete 24 => 15 + (new entry needed)
                strNumber="";
                display.innerHTML = 0;
                event.target.innerHTML="AC";
            }else{
            clearOrError();
            }
        } else if (operationOrExcuteKey){
            calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
            if(strNumber===""){
                
                if (previousOperator !== "calculate") {
                     operationBeforeCalculate = previousOperator;
                 }

                if (previousOperator){
                    const displayNumber = parseFloat(display.innerHTML);
                    if (actionKey === "calculate"){
                        if (previousOperator!=="calculate") {
                            displayMini.innerHTML = `${displayNumber} ${operatorList[operationBeforeCalculate]} ${displayNumber}`;
                            answer = operationManager(previousOperator, displayNumber, displayNumber);

                        } else if (previousOperator === "calculate"){
                            if(!operationBeforeCalculate) operationBeforeCalculate = "calculate";
                            displayMini.innerHTML = `${displayNumber} ${operatorList[operationBeforeCalculate]} ${globalConvertNumber}`;
                            answer = operationManager(operationBeforeCalculate, displayNumber, globalConvertNumber);
                        }

                    } else {
                        displayMini.innerHTML = `${displayNumber} ${operatorList[actionKey]}`;
                    }

                    display.innerHTML = answer;

                }
                previousOperator = actionKey;
            } else {

                const convertNumber = parseFloat(strNumber);
                globalConvertNumber = convertNumber;

                if (previousOperator) {

                    if(previousOperator==="calculate"){
                        displayMini.innerHTML = `${convertNumber} ${operatorList[actionKey]}`;
                    }else{
                        console.log("checking edge cases");
                        displayMini.innerHTML = `${answer} ${operatorList[previousOperator]} ${convertNumber}`;
                    }
                    answer = operationManager(previousOperator, answer, convertNumber);

                } else {
                    displayMini.innerHTML = `${convertNumber} ${operatorList[actionKey]}`;
                    answer = convertNumber;
                }

                display.innerHTML = answer;
                strNumber = '';
                operationBeforeCalculate = previousOperator;
                previousOperator = actionKey;

            }
        }
    });
});



function clearOrError(clear=true){
    clear ? display.innerHTML = 0 : display.innerHTML = "err";
    displayMini.innerHTML = "Display Previous Entry";
    answer = null;
    strNumber = "";
    previousOperator = "";
    // may not use
    operationBeforeCalculate = "";
    globalConvertNumber = null;
}

function operationManager(previousOperator, answer, convertNumber){
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
        if(convertNumber){
            return convertNumber;
            }
            return answer;
        default:
            clearOrError(false);
    }
}