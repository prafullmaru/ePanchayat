export function prepareDate(date: string): Date {
  if (!date) {
    return null;
  }

  const dateParts = date.split('/');
  const year =
    dateParts[2].length > 2
      ? dateParts[2]
      : `${'20'}${dateParts[2].substring(0, 4)}`;
  const month = dateParts[0];
  const day = dateParts[1];

  return new Date(+year, +month - 1, +day);
}
