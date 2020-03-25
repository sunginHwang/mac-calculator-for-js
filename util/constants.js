export const CALCULATE_MODE = {
    CLEAR: 'CLEAR',
    INPUT: 'INPUT',
    OPERATOR: 'OPERATOR',
    EQUAL: 'EQUAL',
};
export const OPERATORS = ['*', '-', '/', '+'];
export const CLEAR_TYPE = {
    CLEAR: 'CLEAR', // 현재 마지막 결과값만 연산 최초값으로 기억하고 나머지 초기화
    ALL_CLEAR: 'ALL_CLEAR', // 모든 메모리 초기화
};

export const BUTTON_TYPE = {
    NORMAL: 'normal-button-active',
    OPERATOR: 'operator-button-active',
    CLEAR: 'clear-button-active',
};