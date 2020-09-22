import {operationManager} from "./operationManager.js";
//operations are only excuted when the next operator is input
//addition, subtraction, division, multiplication and 
//some equals cases (the other equals edge cases (due to input handling) are handled in UI manager)

test("addition, 2+2 =4", ()=> {
    expect(operationManager("add", 2, 2)).toEqual(4);
});
test("addition, 0.1+0.001 =0.101", () => {
    expect(operationManager("add", 0.1, 0.001)).toEqual(0.101);
});
test("addition, -0.1+0.001 =-0.099", () => {
    expect(operationManager("add", -0.1, 0.001)).toEqual(-0.099);
});


test("subtraction, 2-2 =0", () => {
    expect(operationManager("subtract", 2, 2)).toEqual(0);
});
test("subtraction, 0.1-0.001 =0.101", () => {
    expect(operationManager("subtract", 0.1, 0.001)).toEqual(0.099);
});
test("subtraction, 0.001-0.1 =-0.099", () => {
    expect(operationManager("subtract", 0.001, 0.1)).toEqual(-0.099);
});

test("multiplication, 2*2 =0", () => {
    expect(operationManager("multiply", 2, 2)).toEqual(4);
});
test("multiply, 0.1*-0.001 =0.101", () => {
    expect(operationManager("multiply", 0.1, -0.001)).toEqual(-0.0001);
});
test("multiply, 0.001*-0.1 =-0.099", () => {
    expect(operationManager("multiply", -0.001, -0.1)).toEqual(0.0001);
});

test("division, 2/2 =1", () => {
    expect(operationManager("divide", 2, 2)).toEqual(1);
});
test("division, 0.1/-0.001 =100", () => {
    expect(operationManager("divide", 0.1, -0.001)).toEqual(-100);
});
test("division, 0.001/0 = infinity", () => {
    expect(operationManager("divide", 0.001, 0)).toBe(Infinity);
});

//equals test 1 
test("equals (if the previous number is still stored in the answer ie. 1), 6 = 6", () => {
    // if the previous number is stored
    expect(operationManager("calculate", 1, 6)).toBe(6);
});
test("equals, (if the previous number is still stored in the answer ie. 6) 0 = 0", () => {
    expect(operationManager("calculate", 6, 0)).toBe(0);
});
test("equals, 6 = 6", () => {
    expect(operationManager("calculate", 6, "")).toBe(6);
});
test("equals, 6 = 6", () => {
    expect(operationManager("calculate", "", 6)).toBe(6);
});


