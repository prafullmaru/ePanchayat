import { NgModule, ModuleWithProviders } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';

import { WebApiHandlerServiceModule } from '../web-api-handler/web-api-handler.module';
import { UserPreferencesDataService } from './user-preference-data.service';
import { WindowRefModule } from '../windows-ref/windows-ref.module';

@NgModule({
  imports: [LocalStorageModule, WebApiHandlerServiceModule, WindowRefModule],
})
export class UserPreferencesDataServiceModule {
  static forRoot(): ModuleWithProviders<UserPreferencesDataServiceModule> {
    return {
      ngModule: UserPreferencesDataServiceModule,
      providers: [UserPreferencesDataService],
    };
  }
}
