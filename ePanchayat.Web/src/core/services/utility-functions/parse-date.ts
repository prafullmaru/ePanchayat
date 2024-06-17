export function parseDate(date: string): Date {
  if (!date) {
    return null;
  }

  if (isNaN(Date.parse(date))) {
    return null;
  }

  return new Date(date);
}
