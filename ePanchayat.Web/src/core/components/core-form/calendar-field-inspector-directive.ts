import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { Observable, Subject } from '../rxjs-exports';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { ICoreControl } from '../core-form/model';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[calInspector]',
  exportAs: 'calInspector',
})
export class CalendarFieldInspectorDirective implements OnInit, ICoreControl {
  @Input('calInspector') bsDatePickerDirective: BsDatepickerDirective;

  errors: ValidationErrors | null;
  invalid: boolean;
  touched: boolean;
  dirty: boolean;
  required: boolean;

  get statusChanges(): Observable<any> {
    return this.statusChangesSubject.asObservable();
  }

  private statusChangesSubject = new Subject();

  constructor(private elementRef: ElementRef) {
    this.required = this.elementRef.nativeElement.required;
  }

  ngOnInit() {
    this.bsDatePickerDirective.bsValueChange.subscribe((value) =>
      this.onValueChange(value)
    );
  }

  private onValueChange(value) {
    this.errors = {};
    this.invalid = true;
    this.dirty = true;

    if (!this.required) {
      return;
    }

    if (!value) {
      this.errors['required'] = true;
      this.invalid = false;
    }
    this.statusChangesSubject.next({});
  }
}
