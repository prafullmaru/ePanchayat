import { Injectable } from '@angular/core';
import { CoreGridApi } from './model';
import { Observable, Subject } from '../rxjs-exports';

@Injectable()
export class GridStateStore {
  private gridReadyEventSubject = new Subject<CoreGridApi>();

  get gridReadyEvent(): Observable<CoreGridApi> {
    return this.gridReadyEventSubject.asObservable();
  }

  gridReady(gridApi: CoreGridApi) {
    this.gridReadyEventSubject.next(gridApi);
  }
}
