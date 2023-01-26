export function objectIsEmpty(object) {
  return !object || Object.keys(object).length === 0;
}

export function arrayIsEmpty(array) {
  return !Array.isArray(array) || array.length === 0;
}
