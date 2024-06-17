export function pascalCaseToWord(input) {
  return input.replace(/([A-Z][a-z])/g, ' $1').replace(/(\d)/g, ' $1');
}
