export function durationBetweenDates(fromDate: any, toDate: any) {
  const units = ['Day', 'Hour', 'Minute'];

  if (!fromDate || !toDate) {
    return '';
  }

  const setupTimes = [];
  let diff = new Date(toDate).getTime() - new Date(fromDate).getTime();
  diff = Math.trunc(diff / 1000);

  for (const divisor of [60, 60, 24]) {
    setupTimes.push(diff % divisor);
    diff = Math.trunc(diff / divisor);
  }
  setupTimes.push(diff);
  setupTimes.reverse();
  let ans = '';
  for (let i = 0; i < 3; i++) {
    if (ans || setupTimes[i] > 0) {
      const unit = setupTimes[i] > 1 ? units[i] + 's' : units[i];
      ans += `${setupTimes[i]} ${unit}`;
    }
  }
  return ans;
}
