import { Component, Input, ContentChild, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  FormControlDirective,
  NgControl,
} from '@angular/forms';

import { ICoreControl } from './model';

@Component({
  selector: 'core-field',
  templateUrl: './core-field.component.html',
  styleUrls: ['./core-field.component.scss'],
})
export class CoreFieldComponent implements OnInit {
  @Input() label: string;
  @Input() labelInfo: string;
  @Input() validations: { [name: string]: string } = {};
  @Input() info: string;
  @Input() formGroupClass = '';
  @Input() controlRef: ICoreControl;
  @ContentChild(NgControl, { static: true }) ngControl: NgControl;

  hasError = false;
  isRequired = false;
  finalErrors: string[] = [];
  control: NgControl | ICoreControl | UntypedFormControl;

  private isValidationTriggered = true;

  ngOnInit() {
    this.control = this.controlRef || this.ngControl;
    if (this.control instanceof FormControlDirective) {
      this.control = this.control.control;
    }

    if (!this.control || !this.control.statusChanges) {
      return;
    }

    this.control.statusChanges.subscribe(() => this.onControlStatusChange());
    this.calculateIsRequired();
  }

  populateErrors() {
    this.isValidationTriggered = true;

    if (!this.control || !this.control.errors) {
      this.finalErrors = [];
      return;
    }

    this.finalErrors = Object.keys(this.control.errors).map((errorType) => {
      const error = this.validations[errorType];
      return !error ? `${this.label} is required` : error;
    });

    this.hasError = !!this.finalErrors?.length;
  }

  resetErrors() {
    this.finalErrors = [];
    this.hasError = false;
    this.isValidationTriggered = false;
  }

  private onControlStatusChange() {
    this.hasError = this.control.invalid;
    this.calculateIsRequired();

    const showError =
      this.control.dirty && this.control.errors && this.isValidationTriggered;
    if (showError) {
      this.populateErrors();
    } else {
      this.finalErrors = [];
    }
  }

  private calculateIsRequired() {
    if ((this.control as ICoreControl).required) {
      this.isRequired = true;
      return;
    }

    const ngControl = this.control as NgControl;
    if (typeof ngControl.validator === 'function') {
      const requiredValidator = (ngControl as any).validator('required');
      this.isRequired = requiredValidator && requiredValidator.required;
    }
  }
}
