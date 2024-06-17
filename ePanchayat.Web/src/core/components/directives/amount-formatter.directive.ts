import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  forwardRef,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validator,
  ValidationErrors,
  NG_VALIDATORS,
} from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Directive({
  selector: '[amountFormatter][ngModel]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AmountFormatterDirective),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AmountFormatterDirective),
      multi: true,
    },
  ],
})
export class AmountFormatterDirective
  implements ControlValueAccessor, Validator
{
  @Input() allowNegative = false;
  @Input() updateModelOnKeyPress = false;
  @Output() validityChange = new EventEmitter<string>();

  onChange: Function;
  onTuched: Function;
  error: string;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private decimalPipe: DecimalPipe,
  ) {}

  @HostListener('change', ['$event'])
  onChangeEvent(event) {
    const parsedValue = this.propogateChangeToModel(event.target.value);
    this.propogateChangeToView(parsedValue + '');
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event) {
    if (!this.updateModelOnKeyPress) {
      return;
    }

    const parsedValue = this.propogateChangeToModel(event.target.value);
    this.propogateChangeToView(parsedValue + '');
  }

  writeValue(value: string) {
    this.propogateChangeToView(value);
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTuched = fn;
  }

  validate(): ValidationErrors | null {
    return this.error ? { invalidAmount: true } : null;
  }

  private propogateChangeToModel(value: string) {
    this.error = '';
    value = value ? value.toUpperCase().replace(/,/g, '') : '';
    if (!this.isValidFormat(value)) {
      this.error = 'Unknown quantity format';
      value = '';
      this.onChange(value);
      return value;
    }

    const occurencesOfM = (value.match(/M/g) || []).length;
    let parsedValue = +value.replace(/M/g, '');
    if (occurencesOfM) {
      parsedValue =
        occurencesOfM === 2 ? parsedValue * 1000000 : parsedValue * 1000;
    }
    this.onChange(parsedValue);
    return parsedValue;
  }

  private propogateChangeToView(value: string) {
    this.error = '';
    value = (value || '').toString();

    const element = this.elementRef.nativeElement;

    if (value && !this.isValidFormat(value)) {
      this.error = 'Unknown quantity format';
      this.renderer.setProperty(element, 'value', '');
    }

    const pattern = this.allowNegative ? /^-?[0-9,.]*$/ : /^[0-9,.]*$/;

    if (!value || !value.match(pattern)) {
      this.renderer.setProperty(element, 'value', value);
      return;
    }

    const parsedValue = +value.replace(/,/g, '');
    const transformedValue = this.decimalPipe.transform(parsedValue);
    this.renderer.setProperty(element, 'value', transformedValue);
  }

  private isValidFormat(value: string) {
    if (!value) {
      return true;
    }

    const pattern = this.allowNegative
      ? /^-?[0-9]+[M]{0,2}([\.\,][0-9]*[M]{0,2})*$/
      : /^[0-9]+[M]{0,2}([\.\,][0-9]*[M]{0,2})*$/;
    return value.match(pattern);
  }
}
