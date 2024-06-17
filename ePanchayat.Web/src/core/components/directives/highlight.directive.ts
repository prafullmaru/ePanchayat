import {
  Directive,
  ElementRef,
  OnChanges,
  Input,
  SimpleChange,
  OnDestroy,
} from '@angular/core';

import { isChangeDefinedAndDifferent } from '@core/services';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective implements OnChanges, OnDestroy {
  @Input('highlight') shouldFocus: boolean;

  private timeoutId;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(simpleChanges) {
    const fieldValueChange: SimpleChange = simpleChanges.fieldValue;
    if (
      !isChangeDefinedAndDifferent(fieldValueChange) ||
      fieldValueChange.firstChange
    ) {
      return;
    }
    const newClass =
      +fieldValueChange.currentValue > +fieldValueChange.previousValue
        ? 'highlight-green'
        : 'highlight-red';
    const element: HTMLElement = this.elementRef.nativeElement;
    element.classList.add(newClass);

    this.timeoutId = setTimeout(() => {
      element.classList.remove(newClass);
    }, 5000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutId);
  }
}
