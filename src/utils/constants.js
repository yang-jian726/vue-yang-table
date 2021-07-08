export const input_verify = {
  TYPE_NUMERIC: 1,
  TYPE_LOWER_LETTER: 2,
  TYPE_UPPER_LETTER: 4,
  TYPE_UNDER_LINE: 16,
  TYPE_CHINESE_CHAR: 32,
  TYPE_CHINESE_PRINT_CHAR: 64,
  TYPE_SPECIAL_CHAR: 256
};
input_verify.TYPE_LETTER = input_verify.TYPE_LOWER_LETTER | input_verify.TYPE_UPPER_LETTER;
input_verify.TYPE_NONSPECIAL_CHAR = input_verify.TYPE_NUMERIC | input_verify.TYPE_LETTER |
  input_verify.TYPE_UNDER_LINE;

export const MONEY_MAX = 9999999999999;
export function WhInvalidInputError(errorCode, hintKey, limitValue = -1) {
  this.errorCode = errorCode;
  this.hintKey = hintKey;
  this.limitValue = limitValue;
}

export function WhInvalidDateError(errorCode, startHintKey, endHintKey) {
  this.errorCode = errorCode;
  this.startHintKey = startHintKey;
  this.endHintKey = endHintKey;
}

export const ERROR_CODE={
  "INPUT_EMPTY" : "INPUT_EMPTY",
  "MAX_LENGTH" : "MAX_LENGTH",
  "MIN_VALUE" : "MIN_VALUE",
  "MAX_VALUE" : "MAX_VALUE",
  "VALUE_GT_ZERO" : "VALUE_GT_ZERO",
  "VALUE_GTE_ZERO" : "VALUE_GTE_ZERO",
  "INVALID_DATE" : "INVALID_DATE",
  "INVALID_DATE_INTERVAL" : "INVALID_DATE_INTERVAL",
}

