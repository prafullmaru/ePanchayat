import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'todate',
})
export class TodatePipe {
  constructor(private datePipe: DatePipe) {}

  transform(inputDate: any, format?: string, includeTime?: boolean) {
    if (!inputDate) {
      return inputDate;
    }
    // this condition is for Aggregated Footer Rows. the may but can contain any text as a footer
    if (!this.isValueDateLike(inputDate)) {
      return inputDate;
    }

    if (isNaN(Date.parse(inputDate))) {
      return '';
    }

    if (includeTime) {
      format = format + ' hh:mm:ss a';
    }

    return this.datePipe.transform(inputDate, format);
  }

  isValueDateLike(value: string): boolean {
    // it doesnt have split function because it could be a Date object itself. we have no uniformity in waht send from server to client
    if (!value.split) {
      return true;
    }

    let valueSplits = value.split('/');
    if (valueSplits.length === 3) {
      return true;
    }

    valueSplits = value.split('-');
    if (valueSplits.length === 3) {
      return true;
    }
    return false;
  }
}
