import { CalendarDate, dateFormats } from './model';

// this is copy of ajs1 code, no refactoring as this is sensitive area
export class Calendar implements CalendarDate {
  Dtopened = false;
  DtopenedTo = false;
  dateOptions;
  format: string;
  alInputFormats: string;
  dt: Date;
  cobDt: Date;
  minDate: Date;
  maxDate: Date;
  config: any;

  constructor(today?: Date, format?: string, maxDate?: Date) {
    this.dateOptions = {
      formatYear: 'yy',
      startingDay: 0,
      showWeeks: false,
    };
    this.format = format != null ? format : dateFormats.defaultDate;
    this.alInputFormats = '';
    this.dt = today;
    this.cobDt = today;
    this.minDate = this.minDate ? null : new Date(1388534400);
    this.maxDate = this.maxDate == null ? new Date(2100, 1, 1) : maxDate;
    this.config = {
      containerClass: 'theme-dark-blue',
      dateInputFormat: this.format,
      showWeekNumbers: false,
    };
  }
  today() {
    this.dt = new Date();
  }
  clear() {
    this.dt = null;
  }
  disabled(date, mode) {
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }
  toggleMin() {
    this.minDate == this.maxDate ? null : new Date(1388534400);
  }
  Dtopen() {
    this.Dtopened = true;
  }
  DtopenTo() {
    this.DtopenedTo = true;
  }
}
