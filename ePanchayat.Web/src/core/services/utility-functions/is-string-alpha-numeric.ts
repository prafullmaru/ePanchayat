export function isStringAlphaNumeric(code: string): Boolean {
  if (!code) {
    return false;
  }

  if (/[^a-zA-Z0-9]/.test(code)) {
    return false;
  }
  return true;
}
