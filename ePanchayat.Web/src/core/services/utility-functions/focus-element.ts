import { ElementRef } from '@angular/core';

export function focusElement(element: ElementRef) {
  if (!element || !element.nativeElement) {
    return;
  }
  element.nativeElement.focus();
}
