export function getGradientBgColor(
  valueRange: any[],
  currentValue: any,
): { backgroundColor?: string } {
  if (isNaN(+currentValue)) {
    return {};
  }

  // value from 0 to 1
  const convertedValues = valueRange
    .map((value) => +value)
    .filter((value) => !isNaN(value));
  const maxNumber = Math.max(...convertedValues);
  const minNumber = Math.min(...convertedValues);
  const denominator = minNumber < 0 ? maxNumber - minNumber : maxNumber - 0;
  const weight = +currentValue / denominator;

  const red = weight * 99 + (1 - weight) * 248;
  const green = weight * 190 + (1 - weight) * 105;
  const blue = weight * 123 + (1 - weight) * 107;

  return { backgroundColor: `rgb(${red}, ${green}, ${blue})` };
}
