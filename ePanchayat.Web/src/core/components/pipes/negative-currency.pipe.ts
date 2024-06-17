import { Pipe } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { isNullOrUndefined } from '@core/services';

@Pipe({
  name: 'negativeCurrency',
})
export class NegativeCurrencyPipe {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(input: number, symbol?: string, fractionSize?: number): any {
    if (isNullOrUndefined(input) || isNaN(+input)) {
      return input;
    }

    if (fractionSize === undefined) {
      fractionSize = 0;
    }

    const digitInfo = `1.0-${fractionSize}`;
    let formatted = this.currencyPipe.transform(
      Math.abs(input),
      symbol,
      'symbol',
      digitInfo
    );

    if (symbol === '') {
      formatted = formatted.replace('$', '');
    }
    return input < 0 ? '(' + formatted + ')' : formatted;
  }
}
