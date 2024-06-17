export function dashCaseToWords(input: string): string {
  return input
    .replace(/(^[a-z])|-([a-z])/g, (word) => word.toUpperCase())
    .replace('-', ' ');
}
