import {showDisplay, changeClearType, getClearType, toggleActiveButton} from './util/domUtil.js';
import {CALCULATE_MODE, OPERATORS, CLEAR_TYPE, BUTTON_TYPE} from './util/constants.js';
import {isValidEqualCalculate, isNotValidOperator, removeRightZeros, removeLeftZeros} from './util/calculatorUtil.js';

// set init value
let lastNumber = null;
let currentNumber = null;
let calculateResult = null;
let operator = null;
let fromEqual = false;
let operatorMode = CALCULATE_MODE.CLEAR;


const changeCalculateMode = calcMode => operatorMode = calcMode;

const checkFromEqual = () => {
    if (fromEqual) { // = 로 계산한 다음 operator 계산 케이스 체크
        currentNumber = calculateResult;
        lastNumber = null;
        operator = null;
        calculateResult = null;
        fromEqual = false;
    }
}

const equalCalculate = () => {
    calculateResult = calculate({lastNumber, currentNumber, operator});
    showDisplay(calculateResult);
    lastNumber = calculateResult;
}

const calculate = ({lastNumber, currentNumber, operator}) => {

    if (isNotValidOperator(operator)) {
        throw Error('not exist operator');
    }
    const result = eval(lastNumber + operator + currentNumber);
    return Number.isInteger(result) ? result : removeRightZeros(result);// 소숫점 마지막 0 들 없애기.
}

const setupInputButton = inputButtonName => {
    toggleActiveButton(inputButtonName); // 버튼 깜빡임.
    changeCalculateMode(CALCULATE_MODE.INPUT); // 모드 변경
    changeClearType(CLEAR_TYPE.CLEAR); // ac -> c 변경
}

// 번호판 입력 이벤트
export const numberClick = number => {
    setupInputButton(`value-${number}`);

    if (currentNumber === null) {
        currentNumber = number
    } else {
        const isZeroPlusZero = currentNumber === '0' && number === '0';
        currentNumber = isZeroPlusZero ? '0' : removeLeftZeros(currentNumber += number);
    }

    showDisplay(currentNumber);

}


// . 입력 이벤트
export const decimalClick = () => {
    setupInputButton('decimal');

    if (currentNumber == null || currentNumber === '0.') {
        currentNumber = '0.';
    } else {
        // 소숫점의 소숫점은 허용불가.  ex) 1.2.1
        if (Number.isInteger(Number(currentNumber))) {
            currentNumber += '.';
        }
    }

    showDisplay(currentNumber);
}


//  초기화 클릭
export const clearClick = () => {
    toggleActiveButton('clear', BUTTON_TYPE.CLEAR);

    currentNumber = null;
    calculateResult = null;
    fromEqual = false;
    showDisplay("0");

    if (getClearType() === CLEAR_TYPE.CLEAR) {
        changeClearType(CLEAR_TYPE.ALL_CLEAR);
    }else{
        // all-clear 는 모든 메모리 삭제.
        lastNumber = null;
        operator = null;
    }
}

// 계산식 이벤트
export const operatorClick = operatorParam => {
    toggleActiveButton(operatorParam, BUTTON_TYPE.OPERATOR);
    changeCalculateMode(CALCULATE_MODE.OPERATOR);
    checkFromEqual();

    if (isValidEqualCalculate({lastNumber, currentNumber, operator})) {
        equalCalculate();
        operator = operatorParam;
        currentNumber = null;
        return;
    }

    const isOnlyInsertFirstNumber = lastNumber == null && currentNumber != null && operator == null; // 첫문자 다음 계산식 넣은 케이스

    if (isOnlyInsertFirstNumber) {
        operator = operatorParam;
        lastNumber = currentNumber;
        currentNumber = null;
    }

}

// = 계산
export const equalClick = () => {
    toggleActiveButton('equal', BUTTON_TYPE.OPERATOR);
    if (isValidEqualCalculate({lastNumber, currentNumber, operator})) {
        changeCalculateMode(CALCULATE_MODE.EQUAL);
        equalCalculate();
        fromEqual = true;
    }
}

// 백스페이스  이벤트.
export const onBackspaceKeydown = () => {
    if (currentNumber === null || operatorMode !== CALCULATE_MODE.INPUT) {
        return;
    }

    currentNumber = currentNumber.length === 1 ? '0' : currentNumber.slice(0, -1);
    showDisplay(currentNumber);
}

// 키보드 이벤트
export const calculatorKeyboardEvent = e => {
    e.preventDefault();

    const key = e.key;

    if (Number.isInteger(Number(key))) {
        numberClick(key);
        return;
    }

    if (OPERATORS.includes(key)) {
        operatorClick(key);
        return;
    }

    if (key === '=' || key === 'Enter') {
        equalClick();
        return;
    }

    if (key === '.') {
        decimalClick();
        return;
    }

    if(key === 'Escape'){
        clearClick();
        return;
    }

    if (key === 'Backspace') {
        onBackspaceKeydown();
        return;
    }
};