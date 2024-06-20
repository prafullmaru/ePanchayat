import { Directive, ElementRef, HostListener } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgModel } from '@angular/forms';

import { isNullOrUndefined } from '@core/services';

@Directive({
  selector: '[numberFormatter]',
  providers: [NgModel],
})
export class NumberFormatterDirective {
  private nativeElement: HTMLInputElement;

  constructor(
    private elementRef: ElementRef,
    private decimalPipe: DecimalPipe,
    private ngModel: NgModel
  ) {
    this.nativeElement = this.elementRef.nativeElement;
    this.ngModel.valueChanges?.subscribe((value) =>
      this.onNgModelChange(value)
    );
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string) {
    const sanitizedValue = this.sanitizeValue(value);
    this.ngModel.update.emit(+sanitizedValue);
  }

  private onNgModelChange(value) {
    if (isNullOrUndefined(value)) {
      return;
    }

    const isTypeString = typeof value === 'string';
    if (isTypeString) {
      value = value.replace(/[^0-9.]/g, '');
    }
    if (isTypeString && value.endsWith('.')) {
      this.nativeElement.value = value;
      return;
    }
    const sanitizedValue = this.sanitizeValue(value);
    this.nativeElement.value = this.decimalPipe.transform(
      sanitizedValue,
      '1.0-10'
    );
  }

  private sanitizeValue(value: number | string) {
    if (typeof value === 'number') {
      return value;
    }
    return value.replace(/,/g, '');
  }
}
