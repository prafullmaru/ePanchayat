import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BlockUiInterceptor } from './block-ui-interceptor.service';
import { BlockUiStateService } from './block-ui-state.service';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BlockUiInterceptor, multi: true },
    BlockUiStateService,
  ],
})
export class HttpInterceptorModule {}
