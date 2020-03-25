import { CLEAR_TYPE, BUTTON_TYPE } from './constants.js';

export const showDisplay = displayValue => {
    document.getElementById('display').setAttribute('value', displayValue);
    changeDisplayFontSize(displayValue);
};

const changeDisplayFontSize = displayValue => {
    const displayEl = document.getElementById('display');

    if (displayValue.length > 33) {
        displayEl.style.fontSize = '1rem';
    } else if (displayValue.length > 14) {
        displayEl.style.fontSize = '1.4rem';
    } else {
        displayEl.style.fontSize = '3.4rem';
    }
};

export const changeClearType = (clearType = CLEAR_TYPE.ALL_CLEAR) => {
    const calculatorClearEl = document.getElementById('calculator-clear');
    calculatorClearEl.innerHTML = clearType === CLEAR_TYPE.ALL_CLEAR ? 'AC' : 'C';
    calculatorClearEl.dataset.clearType = clearType;
};

export const getClearType = () => document.getElementById('calculator-clear').dataset.clearType;

export const getDisplayValue = () => document.getElementById('display').value;

// 클릭 버튼 깜빡임 효과
export const toggleActiveButton = (buttonName, buttonType = BUTTON_TYPE.NORMAL) => {
    const toggleButtonEl = document.getElementsByClassName(buttonName)[0];
    toggleButtonEl.classList.add(buttonType);
    setTimeout(() => toggleButtonEl.classList.remove(buttonType), 100);
};