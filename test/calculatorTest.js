import {getDisplayValue} from "../util/domUtil.js";
import {clearClick, decimalClick, equalClick, numberClick, operatorClick, onBackspaceKeydown} from "../calculator.js";


const allClear = () => {
    clearClick();
    clearClick();
};

const withClearTest = testFunction => {
    const result = testFunction();
    allClear();
    return result
}

export const calculatorTest = () => {
    allClear();

    let totalTestResult = (
        withClearTest(addTest) &&
        withClearTest(subtractTest) &&
        withClearTest(multiplyTest) &&
        withClearTest(divideTest) &&
        withClearTest(multiOperatorTest) &&
        withClearTest(multiEqualTest) &&
        withClearTest(leftRightMultiZeroInputTest) &&
        withClearTest(clearTest) &&
        withClearTest(backSpaceKeyTest)
    )

    totalTestResult ? alert('테스트 성공') : alert('테스트 실패');
}


// 1 +2 = 3
const addTest = () => {
    numberClick('1');
    operatorClick('+');
    numberClick('2');
    equalClick();
    return '3' === getDisplayValue();
}

// 1  - 2 = -1
const subtractTest = () => {
    numberClick('1');
    operatorClick('-');
    numberClick('2');
    equalClick();
    return '-1' === getDisplayValue();
}

// 3 * 6 = 18
const multiplyTest = () => {
    numberClick('3');
    operatorClick('*');
    numberClick('6');
    equalClick();
    return '18' === getDisplayValue();
}

// 12 / 5 = 2.4
const divideTest = () => {
    numberClick('1');
    numberClick('2');
    operatorClick('/');
    numberClick('5');
    equalClick();
    return '2.4' === getDisplayValue();
}

// 10.5 + 7 = - 10 = 7.5
const multiOperatorTest = () => {

    numberClick('1');
    numberClick('0');
    decimalClick();
    numberClick('5');

    operatorClick('+');

    numberClick('7');

    equalClick();

    operatorClick('-');
    numberClick('1');
    numberClick('0');

    equalClick();
    return '7.5' === getDisplayValue();
}

// multiEqualTest
const multiEqualTest = () => {

    numberClick('1');
    operatorClick('+');
    numberClick('2');

    equalClick();
    equalClick();
    equalClick();

    return '7' === getDisplayValue();
}

// 0001.12000 + 1;
const leftRightMultiZeroInputTest = () => {

    numberClick('0');
    numberClick('0');
    numberClick('0');
    numberClick('1');
    decimalClick();
    numberClick('1');
    numberClick('2');
    numberClick('0');
    numberClick('0');
    numberClick('0');

    operatorClick('+');

    numberClick(1);
    equalClick();
    return '2.12' === getDisplayValue();
}

// clear function test  ex. 1+2+3=C+1
const clearTest = () => {

    numberClick('1');
    operatorClick('+');
    numberClick('2');
    operatorClick('+');
    numberClick('3');
    equalClick();
    clearClick();
    operatorClick('+');
    numberClick('1');
    equalClick();
    return '7' === getDisplayValue();
}

/// 123 to remove two => 1
const backSpaceKeyTest = () => {
    numberClick('1');
    numberClick('2');
    numberClick('3');
    onBackspaceKeydown();
    onBackspaceKeydown();
    return '1' === getDisplayValue();
}
