export function areEqualDates(date1, date2): boolean {
  return new Date(date1).getDate() === new Date(date2).getDate();
}
