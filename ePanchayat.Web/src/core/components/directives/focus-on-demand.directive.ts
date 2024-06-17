import { Directive, ElementRef, OnChanges, Input } from '@angular/core';

import { isChangeDefinedAndDifferent } from '@core/services';

@Directive({
  selector: '[focusOnDemand]',
})
export class FocusOnDemandDirective implements OnChanges {
  @Input('focusOnDemand') shouldFocus: boolean;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(simpleChanges) {
    if (!isChangeDefinedAndDifferent(simpleChanges.shouldFocus)) {
      return;
    }
    if (this.shouldFocus) {
      this.elementRef.nativeElement.focus();
    }
  }
}
