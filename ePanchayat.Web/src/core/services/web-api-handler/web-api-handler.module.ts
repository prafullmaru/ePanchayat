import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { WebApiHandlerService } from './web-api-handler.service';
import { API_HANDLER_CONFIG_TOKEN } from './api-handler-config-token';

@NgModule({
  imports: [HttpClientModule],
})
export class WebApiHandlerServiceModule {
  static forRoot(
    defaultServiceName: string
  ): ModuleWithProviders<WebApiHandlerServiceModule> {
    return {
      ngModule: WebApiHandlerServiceModule,
      providers: [
        WebApiHandlerService,
        {
          provide: API_HANDLER_CONFIG_TOKEN,
          useValue: defaultServiceName,
        },
      ],
    };
  }
}
