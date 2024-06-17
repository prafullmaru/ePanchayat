import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BlockUiState } from './model';

@Injectable()
export class BlockUiStateService {
  private readonly stateSubject = new BehaviorSubject<BlockUiState>({});

  getState() {
    return this.stateSubject.asObservable();
  }

  setState(state: BlockUiState) {
    this.stateSubject.next(state);
  }
}
