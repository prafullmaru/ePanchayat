export interface CalendarDate {
  updateDateMin?: Date;
  updateDateMax?: Date;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  dateOptions?: any;
  altInputFormats?: string;
  cobDt: Date;
  disabled: (date, mode) => {};
  Dtopen: () => void;
  config?: any;
}
