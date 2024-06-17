import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  CurrencyPipe,
  DecimalPipe,
  DatePipe,
  PercentPipe,
} from '@angular/common';

import { NegativeNumberPipe } from './negative-number.pipe';
import { NegativeCurrencyPipe } from './negative-currency.pipe';
import { TodatePipe } from './todate.pipe';
import { CollectionFilterPipe } from './collection-filter.pipe';
import { AmountFormatterPipe } from './amount-formatter.pipe';

const customPipes = [
  NegativeCurrencyPipe,
  NegativeNumberPipe,
  TodatePipe,
  CollectionFilterPipe,
  AmountFormatterPipe,
];

@NgModule({
  declarations: customPipes,
  exports: customPipes,
})
export class CorePipesModule {
  static forRoot(): ModuleWithProviders<CorePipesModule> {
    return {
      ngModule: CorePipesModule,
      providers: [
        CurrencyPipe,
        DecimalPipe,
        PercentPipe,
        DatePipe,
        ...customPipes,
      ],
    };
  }
}
