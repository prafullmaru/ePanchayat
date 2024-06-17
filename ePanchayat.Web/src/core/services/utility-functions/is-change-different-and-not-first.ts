import { SimpleChange } from '@angular/core';
import { areEqual } from './are-equal';

export function isChangeDifferentAndNotFirst(change: SimpleChange): boolean {
  if (!change || change.firstChange) {
    return false;
  }

  return !areEqual(change.currentValue, change.previousValue);
}
