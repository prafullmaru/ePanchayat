import { Component, Input, OnDestroy, ElementRef } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { tabToNextInput } from '@core/services';
import { Observable, Subject } from '../rxjs-exports';
import { ICoreControl } from './model';

@Component({
  selector: 'selector-input-base',
  template: '',
})
export class SelectorInputBaseComponent implements OnDestroy, ICoreControl {
  @Input() required: boolean;
  errors: ValidationErrors | null;
  invalid: boolean;
  touched: boolean;
  dirty: boolean;

  get statusChanges(): Observable<any> {
    return this.statusChangesSubject.asObservable();
  }

  private statusChangesSubject = new Subject();

  constructor(protected elementRef: ElementRef) {}

  isPopulated(): boolean {
    return true;
  }

  ngOnDestroy() {
    this.statusChangesSubject.complete();
  }

  onValueChange(firstChange = false) {
    this.errors = {};
    this.invalid = false;
    this.dirty = !firstChange;
    const isPopulated = this.isPopulated();

    if (isPopulated) {
      tabToNextInput(this.elementRef.nativeElement, true);
    }

    if (!isPopulated && this.required) {
      this.errors['required'] = true;
      this.invalid = true;
    }
    this.statusChangesSubject.next({});
  }
}
