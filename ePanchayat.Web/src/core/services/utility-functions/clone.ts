export function clone(input): any {
  if (!input) {
    return input;
  }
  if (typeof input === 'string') {
    return input;
  }
  return input instanceof Array ? [...input] : { ...input };
}
