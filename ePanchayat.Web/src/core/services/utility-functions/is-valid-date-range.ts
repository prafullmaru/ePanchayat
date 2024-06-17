export function isValidDateRange(fromDate: Date, toDate: Date): boolean {
  if (!fromDate || !toDate) {
    return false;
  }

  return toDate.setHours(0, 0, 0) >= fromDate.setHours(0, 0, 0);
}
