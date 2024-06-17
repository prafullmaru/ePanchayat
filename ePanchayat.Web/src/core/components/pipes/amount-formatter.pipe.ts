import { Pipe } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'amountFormatter',
})
export class AmountFormatterPipe {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(
    input: string | number,
    allowNegative = false,
    digitInfo = '1.0-3',
  ): any {
    const pattern = allowNegative ? /^-?[0-9,.]*$/ : /^[0-9,.]*$/;
    if (!input || (typeof input === 'string' && !input.match(pattern))) {
      return input;
    }

    const parsedValue =
      typeof input === 'number' ? input : input.replace(/,/g, '');
    return this.decimalPipe.transform(parsedValue, digitInfo);
  }
}
