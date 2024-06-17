export function arrayToDictionary<V>(
  keyField: string,
  array: V[],
  keyTransformationFunction: Function = null,
): { [key: string]: V } {
  const dict: { [key: string]: V } = {};
  if (!array) {
    return dict;
  }

  array.forEach((item) => {
    if (!item || !item[keyField]?.toString()) {
      return;
    }
    if (!keyTransformationFunction) {
      dict[item[keyField].toString()] = item;
    } else {
      dict[keyTransformationFunction(item[keyField].toString())] = item;
    }
  });
  return dict;
}
