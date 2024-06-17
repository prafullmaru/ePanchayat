import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { BlockUiStateService } from './block-ui-state.service';

@Injectable()
export class BlockUiInterceptor implements HttpInterceptor {
  private readonly requestQueueStatus: { [url: string]: boolean } = {};
  private readonly isSilentHeader = 'isSilent';

  constructor(private stateService: BlockUiStateService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isSilent = request.headers.get(this.isSilentHeader) === 'true';
    const isWebSocketConn = request.url.includes(':8184');

    const isBlocking = !isSilent && !isWebSocketConn;
    if (isBlocking) {
      this.startBlocking(request.url);
    }

    const cloneRequest = request.clone({
      headers: request.headers.delete(this.isSilentHeader),
    });

    return next.handle(cloneRequest).pipe(
      finalize(() => {
        if (isBlocking) {
          this.stopBlocking(cloneRequest.url);
        }
      })
    );
  }

  private startBlocking(url: string) {
    this.requestQueueStatus[url] = true;
    setTimeout(() => {
      if (this.requestQueueStatus[url]) {
        this.stateService.setState({ isActive: true });
      }
    }, 500);
  }

  private stopBlocking(url: string) {
    delete this.requestQueueStatus[url];
    const isPending = Object.values(this.requestQueueStatus).find(
      (status) => status === true
    );

    if (isPending) {
      this.stateService.setState({ isActive: false });
    }
  }
}
