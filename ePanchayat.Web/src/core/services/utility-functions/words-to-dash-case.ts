export function wordsToDashCase(input: string) {
  return input.toLowerCase().replace(/\s+[a-z]/g, (m) => '-' + m.trim());
}
