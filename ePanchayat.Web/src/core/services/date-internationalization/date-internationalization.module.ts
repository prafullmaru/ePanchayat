import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageModule } from 'angular-2-local-storage';

import { DateInternationalizationService } from './date-internationalization.service';

@NgModule({
  imports: [LocalStorageModule, CommonModule],
})
export class DateInternationalizationModule {
  static forRoot(): ModuleWithProviders<DateInternationalizationModule> {
    return {
      ngModule: DateInternationalizationModule,
      providers: [DateInternationalizationService],
    };
  }
}
