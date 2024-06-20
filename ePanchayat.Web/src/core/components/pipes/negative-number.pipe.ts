import { Pipe } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { isNullOrUndefined, isEmpty } from '@core/services';

@Pipe({
  name: 'negativeNumber',
})
export class NegativeNumberPipe {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(
    input,
    decimals?: any,
    trimtrailingzeroes?: any,
    ignoreNullOrEmpty = false
  ) {
    if (isNaN(+input)) {
      return input;
    }

    const isValueNullOrEmpty = isNullOrUndefined(input) || isEmpty(input);
    if (ignoreNullOrEmpty && isValueNullOrEmpty) {
      return '';
    }

    if (!decimals) {
      decimals = 0;
    }

    if (trimtrailingzeroes && input % 1 === 0) {
      decimals = 0;
    }

    const digitInfo = `1.${decimals}-${decimals}`;

    if (input < 0) {
      return '(' + this.decimalPipe.transform(Math.abs(input), digitInfo) + ')';
    } else {
      return this.decimalPipe.transform(Math.abs(input), digitInfo);
    }
  }
}
