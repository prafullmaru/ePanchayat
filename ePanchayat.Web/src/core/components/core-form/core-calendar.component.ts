import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable, Subject } from '../rxjs-exports';
import {
  CalendarDate,
  isChangeDefinedAndDifferent,
  dateFormats,
  DateInternationalizationService,
  cloneDeep,
} from '@core/services';

import { ICoreControl } from './model';

@Component({
  selector: 'core-calendar',
  templateUrl: 'core-calendar.component.html',
  styleUrls: ['core-calendar.component.scss'],
})
export class CoreCalendarComponent implements OnInit, OnChanges, ICoreControl {
  @Input() disabled = false;
  @Input() required;
  @Input() date: CalendarDate;
  @Input() className: string;
  @Input() daysDisabled: number[];
  @Input() allowZeroTime = false;
  @Input() preserveTime = false;
  @Output() valueChange = new EventEmitter<Date>();

  @ViewChild('calendar Input', { static: false }) calendarInput: ElementRef;

  errors: ValidationErrors | null;
  invalid: boolean;
  touched: boolean;
  dirty: boolean;
  prevSelectedDate: CalendarDate;

  get statusChanges(): Observable<any> {
    return this.statusChangesSubject.asObservable();
  }

  private statusChangesSubject = new Subject();

  constructor(
    private dateService: DateInternationalizationService,
    private readonly zone: NgZone
  ) {}

  ngOnInit() {
    this.prevSelectedDate = cloneDeep(this.date);
    if (this.date?.config) {
      this.date.config.showTodayButton = true;
    }

    if (this.date?.format === dateFormats.defaultDateTime) {
      this.preserveTime = true;
    }
  }

  ngOnChanges(changes) {
    if (isChangeDefinedAndDifferent(changes.required)) {
      this.onValueChange(changes.required.firstChange, true);
    }

    if (isChangeDefinedAndDifferent(changes.date)) {
      this.onValueChange(changes.date.firstChange, true);
    }

    if (this.date?.format === dateFormats.defaultDateTime) {
      this.preserveTime = true;
    }
  }

  // This is called from core-calendar.editor.ts to start editing immediately after entering the component.
  focus() {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.calendarInput.nativeElement.focus();
        this.calendarInput.nativeElement.select();
        this.calendarInput.nativeElement.click();
      }, 0);
    });
  }

  onValueChange(isFirstInputChange?: boolean, isInputChange = false) {
    if (this.date.cobDt && this.date.cobDt.toString() == 'Invalid Date') {
      this.date.cobDt = this.prevSelectedDate?.cobDt;
      console.log(
        'Retaining previous date as provided value is not valid date.'
      );
    }

    if (
      this.date.cobDt &&
      this.date.minDate &&
      this.date.cobDt.getTime() < this.date.minDate.getTime()
    ) {
      this.date.cobDt = this.prevSelectedDate?.cobDt;
      console.log(
        'Retaining previous date as provided value is less than the minimum. ' +
          'allowed date ' +
          this.dateService.getDateTimeString(this.date.minDate)
      );
      return;
    }

    if (
      this.date.cobDt &&
      this.date.maxDate &&
      this.date.cobDt.getTime() > this.date.maxDate.getTime()
    ) {
      this.date.cobDt = this.prevSelectedDate?.cobDt;
      console.log(
        'Retaining previous date as provided value is more than the maximum ' +
          'allowed date ' +
          this.dateService.getDateTimeString(this.date.maxDate)
      );
      return;
    }

    this.errors = {};
    this.invalid = false;
    this.dirty = !isFirstInputChange;

    if (!this.date.cobDt && this.required) {
      this.errors['required'] = true;
      this.invalid = true;
    }
    this.statusChangesSubject.next({});

    // ngx-bootstrap doesnt preserve Time portion of the date, if switched to previous/next months. so custom implementation
    // https://github.com/valor-software/ngx-bootstrap/issues/3104
    this.preserveTimeStampIfEnabled(this.date);

    // we don't need to let the parent know about the value change when the parent itself is feeding the data to child
    if (!isInputChange) {
      this.prevSelectedDate = cloneDeep(this.date);
      this.valueChange.emit(this.date.cobDt);
    }
  }

  getFormat(): string {
    // its funny that ngx Bootstrap accepts the uppercase DD and WWW, where the angular filter accepts only smaller case dd and yyyy
    return this.date.format.replace('DD', 'dd').replace('YYYY', 'yyyy');
  }

  private preserveTimeStampIfEnabled(date: CalendarDate) {
    if (!this.preserveTime || this.allowZeroTime) {
      return;
    }

    if (!date.cobDt) {
      return;
    }

    if (
      date.cobDt.getHours() !== 0 ||
      date.cobDt.getMinutes() !== 0 ||
      date.cobDt.getSeconds() !== 0
    ) {
      return;
    }

    // new reference
    date.cobDt = new Date(date.cobDt);

    // one caveat
    // user wont be able to manually set 00:00:00 time coz of this change, hence added new input property allowZeroTime for such regs
    const currentDateTime = new Date();
    date.cobDt.setHours(currentDateTime.getHours());
    date.cobDt.setMinutes(currentDateTime.getMinutes());
    date.cobDt.setSeconds(currentDateTime.getSeconds());
  }
}
