export default class CalculatorParameters {
    constructor() {
        this.answer = 0;
        this.strNumber = "";
        this.previousOperator = "";
        this.operationBeforeCalculate = "";
        this.globalConvertNumber = 0;
    }

    numberManager(input) {
        //calculator.querySelector("button[data-action= 'clear']").innerHTML = "CE";
        this.strNumber = this.strNumber.concat(input);

        // 0 typo handling (edge case)
        this.strNumber === "." && (this.strNumber = "0.");
        if (
            (!Number(this.strNumber) && Number(this.strNumber) !== 0) ||
            (this.strNumber[0] === "0" && this.strNumber[1] !== ".")
        ) {
            //clearOrError(false);
            this.strNumber = parseFloat(this.strNumber).toString();
        }
        return this.strNumber;
    }
    clearEntry() {
        this.strNumber = "";
    }

    allClear() {
        this.answer = 0;
        this.strNumber = "";
        this.previousOperator = "";
        this.operationBeforeCalculate = "";
        this.globalConvertNumber = 0;
    }
}