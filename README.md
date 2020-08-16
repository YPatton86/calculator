- Display the current value on the calculator input.

- Perform basic mathematical operations when clicked (+ - x /).

- AC clears the current value and changes display input to 0.

- handle the decimal input (.) and transform the actual value to a decimal value.

Additional Features

Display the previous entry:
It shows the equation, and current input

CE option:

    Click on any number key (incl. decimal key) the AC button changes to CE.

    after clear entry with CE it will go back to AC then you can click on AC to clear the

    CE clears and go back to the previous entry or 0 if no previous entry.
    e.g.
    15 + 24, then delete 24 with CE then 15 will be displayed.

    Click on any operation key, CE will go back to AC

Operator followed by = :

    If you hit a number followed by an operator followed by a equals, the calculator will give the result such that:
    e.g.
    2 + = —> 2 + 2 = 4
    2 - = —> 2 - 2 = 0
    2 × = —> 2 × 2 = 4
    2 ÷ = —> 2 ÷ 2 = 1

Excution followed by another excution :
If you hit the equals key after a calculation is completed, another calculation should be performed again. Here’s how the calculation should read:
e.g.
keys 5–1
equal. Calculated value is 5 - 1 = 4
equal. Calculated value is 4 - 1 = 3
equal. Calculated value is 3 - 1 = 2
equal. Calculated value is 2 - 1 = 1
equal. Calculated value is 1 - 1 = 0

Edge cases

Following 0 typos will automatically convert into a float number,

e.g.
0012345 => 12345
00.1245 => 0.12345
.123 => 0.123

Operator key:
If you hit any operator key one after the other, the last operator key will be applied for the calculation

e.g. if you hit 5 + - / x then the last operation will be applied to the calculation, i.e., 5 x

Now, you cab press number keys!
Use Delete key for AC/CE
