export interface CalendarDate {
  //PrafullToReview
  updatedatemin?: Date;
  updatedatemax?: Date;
  format?: string;
  minDate?: Date;
  maxDate?: Date;
  dateOptions?: any;
  altInputFormats?: string;
  cobDt: Date;
  disabled: (date, mode) => {};
  //PrafullToReview - naming format is correct? Dtopen?
  Dtopen: () => void;
  config?: any;
}

export const dateFormats = {
  defaultDate: 'DD-MMMM-YYYY',
  defaultDateTime: 'DD-MMMM-YYYY, h:mm:ss a',
};
