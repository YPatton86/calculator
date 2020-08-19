
export function operationManager(prevOp, ans, convertNum) {
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
            if (convertNum || convertNum === 0) {
                return convertNum;
            }
            return ans;
        default:
            return "err";
    }
}