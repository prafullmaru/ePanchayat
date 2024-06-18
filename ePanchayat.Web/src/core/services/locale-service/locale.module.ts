import { NgModule, ModuleWithProviders } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';

import { LocaleService } from './locale.service';

@NgModule({
  imports: [LocalStorageModule],
})
export class LocaleModule {
  static forRoot(): ModuleWithProviders<LocaleModule> {
    return {
      ngModule: LocaleModule,
      providers: [LocaleService],
    };
  }
}
