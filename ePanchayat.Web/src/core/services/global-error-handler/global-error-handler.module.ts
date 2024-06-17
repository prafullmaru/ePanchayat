import { NgModule, ErrorHandler, ModuleWithProviders } from '@angular/core';

import { GlobalErrorHandlerService } from './global-error-handler.service';

@NgModule({})
export class GlobalErrorHandlerModule {
  static forRoot(): ModuleWithProviders<GlobalErrorHandlerModule> {
    return {
      ngModule: GlobalErrorHandlerModule,
      providers: [
        GlobalErrorHandlerService,
        { provide: ErrorHandler, useExisting: GlobalErrorHandlerService },
      ],
    };
  }
}
