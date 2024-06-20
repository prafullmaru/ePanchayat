import { Observable } from '../rxjs-exports';
import { ValidationErrors } from '@angular/forms';

export interface ICoreControl {
  statusChanges: Observable<any>;
  errors: ValidationErrors | null;
  invalid: boolean;
  touched: boolean;
  dirty: boolean;
  required: boolean;
}

export interface IDateRange {
  value: Date[];
  label: string;
}
