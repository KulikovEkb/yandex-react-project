export function objectIsEmpty(object: object | null | undefined) {
  return !object || Object.keys(object).length === 0;
}

export function arrayIsEmpty(array: Array<any>) {
  return !Array.isArray(array) || array.length === 0;
}
