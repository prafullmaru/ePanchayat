import { round } from 'mathjs';

export function toRound(input: number, decimals = 0) {
  if (!input) {
    return round(0, decimals);
  }
  return round(input, decimals);
}
