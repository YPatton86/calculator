const calculator = document.querySelector('.calculator');
const keys = calculator.querySelectorAll("button");
//const key = calculator.querySelector("button");
const display = calculator.querySelector(".calculator__display");

let answer = null;
let strNumber ="";
let previousOperator = "";
//let operationBeforeCalculate = "";
keys.forEach(key=> {
    key.addEventListener('click', function(event){
        const actionKey = event.target.dataset.action;
        const operationOrExcuteKey = event.target.className;
        if (!actionKey || actionKey === "decimal"){

            strNumber = strNumber.concat(event.target.innerHTML);
            if(strNumber === "."){
                strNumber = "0.";
            }

            if (!Number(strNumber) && Number(strNumber) !== 0) {
                //error();
                strNumber = parseFloat(strNumber).toString();
                calculator.querySelector("button[data-action= 'clear']").innerHTML ="CE";
            } else if (strNumber[0] === "0" && strNumber[1]!=="."){
                // any number start with 0 but not followed by . will omit the 0 at the front. i.e. 012345=>12345
                strNumber = parseFloat(strNumber).toString();
                display.innerHTML = strNumber;
                calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
            } else {
                display.innerHTML = strNumber;
                calculator.querySelector("button[data-action= 'clear']").innerHTML = "AC";
            }

        } else if (actionKey === "clear") {
            if(event.target.innerHTML==="CE"){
                strNumber="";
                if(answer){
                display.innerHTML = answer;
                } else {
                display.innerHTML = 0;
                }
                console.log(answer);
                event.target.innerHTML="AC";
            }else{
            clear();
            }
        } else if (operationOrExcuteKey){
            //console.log(strNumber)
            if(strNumber===""){

                // if (previousOperator !== "calculate") {
                //     operationBeforeCalculate = previousOperator;
                // }
                if (previousOperator && actionKey === "calculate") {
                    const displayNumber = parseFloat(display.innerHTML);
                    answer = operationManager(previousOperator, displayNumber, displayNumber);
                    display.innerHTML = answer;
                } 
                previousOperator = actionKey;

            } else {

                const convertNumber = parseFloat(strNumber);

                if (previousOperator) {
                    answer = operationManager(previousOperator, answer, convertNumber);
                    display.innerHTML = answer;
                } else {

                    answer = convertNumber;
                }

                strNumber = '';
                previousOperator = actionKey;

            }
        }
    });
});

function clear(){
    display.innerHTML = 0;
    answer = null;
    strNumber='';
    previousOperator = "";
}

function error(){
    display.innerHTML = "err";
    answer = null;
    strNumber = "";
    previousOperator = "";
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
            error();
    }
}