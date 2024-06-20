import { NgModule, ModuleWithProviders } from '@angular/core';

import { NavigationDataService } from './navigation-data.service';

@NgModule({
  imports: [],
})
export class NavigationDataModule {
  static forRoot(): ModuleWithProviders<NavigationDataModule> {
    return {
      ngModule: NavigationDataModule,
      providers: [NavigationDataService],
    };
  }
}
