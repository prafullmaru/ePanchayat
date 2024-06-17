import { SimpleChange } from '@angular/core';
import { areEqual } from './are-equal';

export function isChangeDefinedAndDifferent(change: SimpleChange): boolean {
  if (!change) {
    return false;
  }

  return !areEqual(change.currentValue, change.previousValue);
}
