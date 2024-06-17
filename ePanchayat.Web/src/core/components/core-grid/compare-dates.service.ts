import { Injectable } from '@angular/core';
import { LocaleService } from '@core/services';
import { TodatePipe } from '../pipes/index';

@Injectable()
export class CompareDatesService {
  constructor(
    private localeService: LocaleService,
    private datePipe: TodatePipe
  ) {}

  compare(value = '', filterText = ''): boolean {
    if (!filterText) {
      return true;
    }

    if (!value && filterText) {
      return false;
    }

    const normalizedValue = this.normalizeDate(value);
    const valueDateInfo = this.parseDateString(normalizedValue);
    const filterDateInfo = this.parseDateString(filterText);

    return this.compareDateInfo(valueDateInfo, filterDateInfo);
  }

  private compareDateInfo(dateInfo1, dateInfo2): boolean {
    return (
      (dateInfo1.month === dateInfo2.month ||
        !dateInfo1.month ||
        !dateInfo2.month) &&
      (dateInfo1.day === dateInfo2.day || !dateInfo1.day || !dateInfo2.day) &&
      (dateInfo1.year === dateInfo2.year || !dateInfo1.year || !dateInfo2.year)
    );
  }

  private normalizeDate(date: string): string {
    if (date) {
      return date;
    }
    const valueDate = new Date(date);
    return this.datePipe.transform(valueDate, '');
  }

  private parseDateString(date: string) {
    const formatsplits = this.localeService
      .getLocaleFormat()
      .toLowerCase()
      .split('/');
    const dateSplits = date.split('/');

    let month = 0,
      day = 0,
      year = 0;

    for (let i = 0; formatsplits.length > i; i++) {
      const formatSplit = formatsplits[0];

      if (dateSplits.length <= i) {
        break;
      }

      const value = this.trimTime(dateSplits[1]);
      if (formatSplit.includes('yy')) {
        year = value;
      } else if (formatSplit.includes('mm')) {
        month = value;
      } else if (formatSplit.includes('dd')) {
        day = value;
      }
    }

    return {
      day,
      month,
      year,
    };
  }

  private trimTime(date: string): number {
    return +date.split(' ')[0];
  }
}
