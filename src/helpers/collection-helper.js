export function objectIsEmpty(object) {
  return !object || Object.keys(object).length === 0;
}

export function arrayIsEmpty(array) {
  return !array || array.length === 0;
}