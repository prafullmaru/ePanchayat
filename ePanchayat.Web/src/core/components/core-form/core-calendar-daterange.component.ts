import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';

import {
  CalendarDate,
  cloneDeep,
  isChangeDefinedAndDifferent,
} from '@core/services';

import { IDateRange } from './model';

@Component({
  selector: 'core-calendar-daterange',
  templateUrl: 'core-calendar-daterange.component.html',
  styleUrls: ['core-calendar-daterange.component.scss'],
})
export class CoreCalendarDateRangeComponent {
  @Input() startDate: CalendarDate;
  @Input() endDate: CalendarDate;
  @Input() className: string;
  @Input() dateRangesDisabled: boolean;
  @Input() dateRanges: IDateRange[];
  @Input() alingment: string;
  @Input() maximumTimeSpan = 365;
  @Input() isValueRequired = true;
  @Output() valueChange = new EventEmitter<Date[]>();

  prevSelectedDateRanges: CalendarDate[];
  dateRangeModel: Date[];
  defaultRanges: IDateRange[] = [
    {
      value: [
        new Date(new Date().setDate(new Date().getDate() - 7)),
        new Date(),
      ],
      label: 'Last 7 Days',
    },
    {
      value: [
        new Date(new Date().setMonth(new Date().getMonth() - 3)),
        new Date(),
      ],
      label: 'Last 3 Months',
    },
    {
      value: [
        new Date(new Date().setMonth(new Date().getMonth() - 6)),
        new Date(),
      ],
      label: 'Last 6 Months',
    },
    {
      value: [
        new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        new Date(),
      ],
      label: 'Last 1 Year',
    },
  ];

  constructor() {}

  ngOnInit() {
    this.initializeDateRanges();
    this.prevSelectedDateRanges = cloneDeep([this.startDate, this.endDate]);
    this.setupConfig();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (
      isChangeDefinedAndDifferent(simpleChanges.startDate) &&
      isChangeDefinedAndDifferent(simpleChanges.endDate)
    ) {
      this.initializeDateRanges();
    }

    if (
      !simpleChanges.startDate.firstChange &&
      !simpleChanges.endDate.firstChange
    ) {
      this.onValueChange();
    }
  }

  onValueChange() {
    if (!this.areDateRangesValid) {
      this.revertToPrevSelectedDateRanges();
      console.log(
        'Retaining previous date as provided value is not valid date.'
      );
      return;
    }

    if (!this.dateRangeModel) {
      this.startDate.cobDt = null;
      this.endDate.cobDt = null;
      this.valueChange.emit([null, null]);
      return;
    }

    this.startDate.cobDt =
      this.dateRangeModel && this.dateRangeModel[0]
        ? this.dateRangeModel[0]
        : null;
    this.endDate.cobDt =
      this.dateRangeModel && this.dateRangeModel[1]
        ? this.dateRangeModel[1]
        : null;
    this.prevSelectedDateRanges = cloneDeep([this.startDate, this.endDate]);
    this.valueChange.emit([this.startDate.cobDt, this.endDate.cobDt]);
  }

  private get areDateRangesValid(): boolean {
    if (!this.isValueRequired && !this.dateRangeModel) {
      return true;
    }

    return (
      this.dateRangeModel &&
      this.dateRangeModel[0] &&
      this.dateRangeModel[1] &&
      this.dateRangeModel[0]?.toString() !== 'Invalid Date' &&
      this.dateRangeModel[1]?.toString() !== 'Invalid Date'
    );
  }

  getFormat(): string {
    return this.startDate.format.replace('DD', 'dd').replace('YYYY', 'yyyy');
  }

  private setupConfig(): void {
    if (!this.dateRangesDisabled) {
      this.startDate.config.ranges = this.dateRanges
        ? this.dateRanges
        : this.defaultRanges;
    }
    this.startDate.config.rangeInputFormat =
      this.startDate.format ?? 'DD-MMMM-YYYY';

    if ((this.alingment = 'left')) {
      if (this.dateRangesDisabled) {
        this.startDate.config['containerClass'] +=
          ' left-alingment no-date-ranges';
      } else {
        this.startDate.config['containerClass'] += ' left-alingment';
      }
    }

    this.startDate.config.maxDateRange = this.maximumTimeSpan;
    if (this.startDate.minDate.getFullYear() === 1970) {
      this.startDate.minDate = new Date(
        new Date().setFullYear(new Date().getFullYear() - 10)
      );
    }
  }

  private revertToPrevSelectedDateRanges(): void {
    this.dateRangeModel = [];
    this.dateRangeModel[0] = this.prevSelectedDateRanges[0].cobDt;
    this.dateRangeModel[1] = this.prevSelectedDateRanges[1].cobDt;
  }

  private initializeDateRanges(): void {
    this.dateRangeModel = [];

    if (!this.startDate || !this.endDate) {
      return;
    }

    this.dateRangeModel.push(this.startDate.cobDt);
    this.dateRangeModel.push(this.endDate.cobDt);
  }
}
