export function getDifferenceBetweenDatesInDays(
  firstDate: Date,
  secondDate: Date,
): number {
  const diff = Math.abs(secondDate.getTime() - firstDate.getTime());
  return Math.round(diff / (1000 * 60 * 60 * 24));
}
