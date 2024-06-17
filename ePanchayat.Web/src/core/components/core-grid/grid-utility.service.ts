import { Injectable } from '@angular/core';
import {
  NegativeCurrencyPipe,
  NegativeNumberPipe,
  TodatePipe,
} from '../pipes/index';
import { distinct } from '@core/services';
import { isNumber } from 'mathjs';
import moment from 'moment-timezone';
import { gridConstants, CoreColumnDef } from './model';

@Injectable()
export class GridUtilityService {
  constructor(
    private negativeCurrencyPipe: NegativeCurrencyPipe,
    private negativeNumberPipe: NegativeNumberPipe,
    private datePipe: TodatePipe
  ) {}

  negativeCurrencyFormatter(input: number, symbol?: any, fractionSize?: any) {
    return this.negativeCurrencyPipe.transform(input, symbol, fractionSize);
  }

  negativeNumberFormatterForString(
    input,
    decimals?: any,
    trimTrailingZeroes?: any,
    ignoreNullOrEmpty = false
  ) {
    return !isNaN(+input)
      ? this.negativeNumberFormatter(
          input,
          decimals,
          trimTrailingZeroes,
          ignoreNullOrEmpty
        )
      : '';
  }

  negativeNumberFormatter(
    input,
    decimals?: any,
    trimTrailingZeroes?: any,
    ignoreNullOrEmpty = false
  ) {
    return this.negativeNumberPipe.transform(
      input,
      decimals,
      trimTrailingZeroes,
      ignoreNullOrEmpty
    );
  }

  negativePercentageFormatter(
    input,
    decimals?: any,
    trimTrailingZeroes?: any,
    ignoreNullOrEmpty = false
  ) {
    this.negativeNumberPipe.transform(
      input,
      decimals,
      trimTrailingZeroes,
      ignoreNullOrEmpty
    );
  }

  dateFormatter(inputDate: string, format?: string, includeTime?: boolean) {
    return this.datePipe.transform(inputDate, format, includeTime);
  }

  regionSpecificDateFormatter(
    inputDate: string,
    regionId: number,
    format?: string,
    includeTime?: boolean
  ) {
    let date = new Date();
    if (regionId == 2) {
      // converting UTC time to UK zone
      const ukTime = moment.utc(inputDate).tz('Europe/London');
      date = new Date(ukTime.format('yyyy-MM-DD HH:mm:ss'));
    } else {
      // converting UTC time to US zone
      const usTime = moment.utc(inputDate).tz('America/New_York');
      date = new Date(usTime.format('yyyy-MM-DD HH:mm:ss'));
    }
    return this.datePipe.transform(date, format, includeTime);
  }

  commaFormatter(input: any[]): string {
    let retVal: string;
    input.forEach((element) => {
      retVal = retVal ? retVal + ', ' : '';
      retVal = retVal + element;
    });
    return retVal;
  }

  yesOrNoFormatter(
    input: boolean | number,
    yesStringValue?: string,
    noStringValue?: string
  ) {
    const isNumberVal = !isNaN(+input);
    if (isNumberVal) {
      input = +input;
    }

    if (yesStringValue && noStringValue) {
      return input ? yesStringValue : noStringValue;
    } else {
      return input ? 'Yes' : 'No';
    }
  }

  negativeAmountRenderer(input: number) {
    return input < 0 ? ['negative-amt', 'right-align'] : ['right-align'];
  }

  imageRenderer(input: number, imgClasses: string, title?: string) {
    return input
      ? `<span title="${title}" class="${imgClasses}" aria-hidden="true"></span>`
      : '';
  }

  iconwithStringRenderer(imgClasses: string, title?: string) {
    if (imgClasses) {
      return `<i class="${imgClasses}"></i>&nbsp;<span>${title}</span>`;
    }
    return '';
  }

  yesOrNoTextCustomComparator(value: string, filterText: string): any {
    const filterTextLowerCase = filterText.toLowerCase();
    const valueLowerCase = value === 'true' ? 'yes' : 'no';
    const aliases = {
      y: 'yes',
      n: 'no',
    };

    const literalMatch =
      valueLowerCase && valueLowerCase.indexOf(filterTextLowerCase) >= 0;
    const aliasMatch =
      valueLowerCase &&
      valueLowerCase.indexOf(aliases[filterTextLowerCase]) >= 0;
    return literalMatch || aliasMatch;
  }

  caseInsensitiveComparator(valueA: string, valueB: string): number {
    if (!valueA && !valueB) {
      return 0;
    }
    if (!valueA) {
      return -1;
    }
    if (!valueB) {
      return 1;
    }
    const normalize = (value) => value.trimLeft().trimRight().toLowerCase();
    return String(normalize(valueA)) > String(normalize(valueB)) ? -1 : 1;
  }

  aggFuncConcat(values: string[] = [], separator = '; ') {
    const validValues = distinct(values).filter((value) => value);
    if (validValues.length > 1) {
      return validValues.join(separator);
    }

    if (validValues.length === 1) {
      return validValues[0];
    }
    return '';
  }

  absoluteValueComparator(valueA, valueB) {
    if (!isNumber(valueA)) {
      return -1;
    }

    if (!isNumber(valueB)) {
      return 1;
    }

    return Math.abs(valueA) - Math.abs(valueB);
  }

  getValueFormatter(dataType: any, params: any): any {
    switch (dataType) {
      case 'Number':
        return this.negativeNumberFormatter(params.value, dataType.MaxDigit);
      case 'Date':
        return this.dateFormatter(params.value);
      case 'Boolean':
        return this.yesOrNoFormatter(params.value);
      default:
        return params.value;
    }
  }

  getCellClass(dataType: any, params: any): any {
    switch (dataType) {
      case 'Number':
        return this.negativeAmountRenderer(params.value);
      default:
        return params.value;
    }
  }

  getFilterType(dataType: any): string {
    switch (dataType) {
      case 'Number':
        return gridConstants.filterTypeNumber;
      case 'Date':
        return gridConstants.filterTypeDate;
      default:
        return gridConstants.filterTypeText;
    }
  }

  buildColDef(colDefData: any[]): CoreColumnDef[] {
    const colDef: CoreColumnDef[] = [];
    colDefData.map((col) => {
      const rookField = {
        field: col.field,
        headerName: col.headerName,
        width: col.width,
        filter: this.getFilterType(col.dataType),
        cellClass: (params) => this.getCellClass(col.dataType, params),
        valueFormatter: (params) =>
          this.getValueFormatter(col.dataType, params),
      };
      colDef.push(rookField);
    });
    return colDef;
  }
}
