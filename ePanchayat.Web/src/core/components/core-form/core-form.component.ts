import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { CoreFieldComponent } from './core-field.component';

@Component({
  selector: 'core-form',
  template: ` <form
    class="label-width-{{ labelWidth }} content-width-{{ contentWidth }}"
    [ngClass]="{ 'form-horizontal': horizontal, 'margin-less': isMarginLess }"
    (ngSubmit)="submit()"
  >
    <ng-content></ng-content>
  </form>`,
  styleUrls: ['./core-form.component.scss'],
})
export class CoreFormComponent implements OnInit {
  @Input() name: string;
  @Input() horizontal: boolean;
  @Input() labelWidth = 25;
  @Input() contentWidth = 60;
  @Input() isMarginLess = false;
  @Output() formSubmit = new EventEmitter<void>();

  @ContentChildren(CoreFieldComponent, { descendants: true })
  rookFields: QueryList<CoreFieldComponent>;

  ngOnInit() {
    if (typeof this.horizontal === 'string' && !this.horizontal) {
      this.horizontal = true;
    }
  }

  submit() {
    this.formSubmit.emit();
  }

  validate(): boolean {
    if (!this.rookFields) {
      return true;
    }

    let isInvalid = false;
    this.rookFields.forEach((rookfield) => {
      rookfield.populateErrors();
      isInvalid = rookfield.hasError || isInvalid;
    });
    return !isInvalid;
  }

  resetValidationErrors() {
    this.rookFields.forEach((rookField) => {
      rookField.resetErrors();
    });
  }
}
