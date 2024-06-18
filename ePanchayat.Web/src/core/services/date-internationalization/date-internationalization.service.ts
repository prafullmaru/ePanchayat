import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Calendar } from './calendar';
import { CalendarDate } from './model';

@Injectable()
export class DateInternationalizationService {
  constructor(private datePipe: DatePipe) {}

  getCalendar(date: Date, format?: string): CalendarDate {
    return new Calendar(date, format);
  }

  getDateString(date, format: string = 'yyyy-MM-dd'): string {
    return this.datePipe.transform(date, format);
  }

  getTodayDateTimeString(): string {
    return this.getDateTimeString(new Date());
  }

  getTodayDateString(): string {
    return this.getDateString(new Date());
  }

  getDateTimeString(
    date: Date,
    format: string = 'yyyy-MM-dd HH:mm:ss',
  ): string {
    return this.datePipe.transform(date, format);
  }
}
