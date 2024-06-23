import {
  Component,
  ElementRef,
  NgZone,
  ViewEncapsulation,
} from '@angular/core';
import { debounce, LocaleService } from '@core/services';
import { TodatePipe } from '../pipes/index';

// tslint:disable-next-line:disallow-direct-import
import { gridConstants } from './model';

@Component({
  templateUrl: './floating-filter.component.html',
  styleUrls: ['./floating-filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FloatingFilterComponent {
  params;
  viewValue = '';
  currentValue: string | Date;
  filterType = '';
  disabled = false;
  placeholder = '';
  colDef;

  private debouncedFn: Function;
  private caseSensitiveValue = '';

  constructor(
    private localeService: LocaleService,
    private datePipe: TodatePipe,
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {}

  agInit(params): void {
    this.params = params;
    this.colDef = this.params.column.colDef;
    this.disabled = this.colDef.filter === gridConstants.filterTypeExcel;
    this.caseSensitiveValue = this.colDef.filterParams?.initialvalue || '';
    this.placeholder = this.calculatePlaceholder();

    const columnGroupId = this.colDef.filterParams?.groupId;
    const childColumnClass = this.colDef.filterParams?.groupChildColumnClass;

    if (!columnGroupId && !childColumnClass) {
      return;
    }

    // floating filtes are mounted on the Grid DOM hierarchy only after AgInit // is completed, hence the timeout but no CD
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        const filterElement = this.elementRef.nativeElement as HTMLElement;
        const filterContainerElement = filterElement.closest(
          '.ag-floating-filter'
        );

        if (!filterContainerElement) {
          return;
        }

        filterContainerElement.classList?.add(columnGroupId);
        if (childColumnClass) {
          filterContainerElement.classList?.add(childColumnClass);
        }
      });
    });
  }

  onValueChange() {
    this.currentValue = this.viewValue;
    this.caseSensitiveValue = this.viewValue;
    if (this.colDef.filter !== gridConstants.filterTypeDate) {
      this.executeFilterChange();
      return;
    }

    const format = this.localeService.getLocaleFormat();
    if (
      this.isFullDateEntered(format, this.currentValue) ||
      !this.currentValue
    ) {
      this.currentValue = this.localeService.parseDate(this.currentValue);
      this.executeFilterChange();
    }
  }

  onParentModelChanged(parentModel): void {
    if (!parentModel) {
      this.currentValue = '';
      this.viewValue = '';
      this.filterType = '';
      return;
    }

    this.filterType = parentModel.type;
    let filterValue;
    if (this.colDef.filter === gridConstants.filterTypeDate) {
      filterValue = this.datePipe.transform(parentModel.dateFrom);
    } else if (this.colDef.filter === gridConstants.filterTypeExcel) {
      filterValue = parentModel.values;
    } else {
      filterValue = parentModel.filter;
    }

    this.currentValue = filterValue;

    if (filterValue instanceof Array) {
      const formattedValues = this.colDef.valueFormatter
        ? filterValue.map((value) => this.colDef.valueFormatter({ value }))
        : filterValue;

      this.viewValue = formattedValues.join(',');
    } else {
      const lowerCasedValue =
        typeof this.caseSensitiveValue === 'string'
          ? this.caseSensitiveValue.toLowerCase()
          : this.caseSensitiveValue;

      this.viewValue =
        filterValue === lowerCasedValue ? this.caseSensitiveValue : filterValue;
    }
  }

  private executeFilterChange() {
    if (this.colDef.filter === gridConstants.filterTypeExcel) {
      return;
    }

    if (!this.debouncedFn) {
      const fn = () =>
        this.params.parentFilterInstance((instance) => {
          const model = this.buildModel();
          instance.onFloatingFilterChanged(model.type, model.filter);
        });

      this.debouncedFn = debounce(fn, 300);
    }
    this.debouncedFn();
  }

  private buildModel(): any {
    const filterType =
      this.filterType || this.colDef.filterParams.defaultOption;

    if (this.colDef.filter === gridConstants.filterTypeNumber) {
      const filter = this.currentValue === '-' ? '' : this.currentValue;
      return {
        type: filterType || gridConstants.filterOptionGreaterThanOrEqual,
        filter,
      };
    }

    if (this.colDef.filter === gridConstants.filterTypeText) {
      return {
        type: filterType || gridConstants.filterOptionContains,
        filter: this.currentValue,
      };
    }

    if (this.colDef.filter === gridConstants.filterTypeDate) {
      return {
        type: filterType || gridConstants.filterOptionExact,
        filter: this.currentValue,
      };
    }

    if (this.colDef.filter === gridConstants.filterTypeExcel) {
      return {
        type: filterType,
        filter: this.currentValue,
      };
    }
  }

  private calculatePlaceholder() {
    return this.colDef.filter === gridConstants.filterTypeDate
      ? this.localeService.getLocaleFormatForDisplay()
      : '';
  }

  private isFullDateEntered(format: string, value: string) {
    let valueSplits;
    if (format.toLowerCase().indexOf('yy') === 0) {
      valueSplits = value.split('/');
      return valueSplits.length > 2 && !valueSplits[2];
    }

    valueSplits = value.split('/');
    return valueSplits.length > 2 && valueSplits[2].length === 4;
  }
}
