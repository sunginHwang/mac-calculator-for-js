import { OPERATORS } from './constants.js';


export const isValidEqualCalculate = ({ lastNumber, currentNumber, operator }) => lastNumber != null && currentNumber != null && operator != null;

export const isNotValidOperator = operator => OPERATORS.indexOf(operator) < 0;

export const removeRightZeros = number => Number(number.toString().replace(/(0+$)/, ''));

export const removeLeftZeros = v => v.replace(/(^0+)/, '');