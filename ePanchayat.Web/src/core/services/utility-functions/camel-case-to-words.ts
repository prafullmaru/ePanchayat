export function camelCaseToWord(value: string) {
  const result = value
    .replace(/([A-Z]+)/g, ' $1')
    .replace(/([A-Z][a-z]+)/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
}
