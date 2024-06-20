import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  OnInit,
  OnChanges,
} from '@angular/core';
import { isChangeDefinedAndDifferent, camelCaseToWord } from '@core/services';
import { getAnimations } from '../animations/index';
// tslint:disable-next-line
import { gridConstants, CoreColumnDef, FilterPill, FilterModel } from './model';
// tslint:disable-next-line
import { GridUtilityService } from './grid-utility.service';
import { SelectOption } from '@core/models';

@Component({
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: getAnimations(),
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() totalItems: number;
  @Input() selectedItems: number;
  @Input() visibleItems: number;
  @Input() filterPresented: boolean;
  @Input() iconsBySideBar: any[];
  @Input() columnsActive: boolean;
  @Input() filtersActive: boolean;
  @Input() actionsActive: boolean;
  @Input() filterModel: FilterModel;
  @Input() columnDefs: CoreColumnDef[];
  @Input() suppressMainMenu = false;
  @Input() filterByItems: SelectOption[];
  @Input() groupByItems: SelectOption[];
  @Output() onColumnsToggle: EventEmitter<any> = new EventEmitter();
  @Output() onFilterToggle: EventEmitter<any> = new EventEmitter();
  @Output() onClearFilters: EventEmitter<any> = new EventEmitter();
  @Output() onActionsToggle: EventEmitter<any> = new EventEmitter();
  @Output() filterModelChange: EventEmitter<any> = new EventEmitter();
  @Output() filterByChange: EventEmitter<string> = new EventEmitter();
  @Output() groupByChange: EventEmitter<string> = new EventEmitter();

  filterpills: FilterPill[] = [];
  filterBy = '';
  groupBy = '';

  constructor(private gridutility: GridUtilityService) {}

  ngOnInit() {
    if (this.groupByItems) {
      this.groupByItems = [{ id: '', value: 'Group By' }, ...this.groupByItems];
    }
  }

  ngOnChanges(simpleChanges) {
    if (isChangeDefinedAndDifferent(simpleChanges.filterModel)) {
      this.constructFilterPills();
    }

    if (
      simpleChanges.filterByItems &&
      this.filterByItems?.length &&
      !this.filterByItems?.find((item) => item.id === '')
    ) {
      this.filterByItems = [
        { id: '', value: 'Filter By' },
        ...this.filterByItems,
      ];
    }
  }

  columnsToggle(): void {
    this.onColumnsToggle.emit();
  }

  filterToggle(): void {
    this.onFilterToggle.emit();
  }

  actionsToggle(): void {
    this.onActionsToggle.emit();
  }

  clearFilters(): void {
    this.onClearFilters.emit();
  }

  clearFilterPill(fieldName: string) {
    const newFilterModel = { ...this.filterModel };
    delete newFilterModel[fieldName];
    this.filterModelChange.emit(newFilterModel);
  }

  private constructFilterPills() {
    this.filterpills = [];
    for (const [key, value] of Object.entries(this.filterModel)) {
      const filterModelValue = value as any;
      let expressionValue = '';
      if (!filterModelValue.operator) {
        expressionValue = this.getExpressionValueByType(filterModelValue);
      } else {
        expressionValue = `${this.getExpressionValueByType(
          filterModelValue.condition1
        )}
                    ${filterModelValue.operator.toUpperCase()}
                    ${this.getExpressionValueByType(
                      filterModelValue.condition2
                    )}`;
      }

      this.filterpills.push({
        columnId: key,
        columnName: this.getColumnName(key),
        expressionValue,
      });
    }
  }

  private getExpressionValueByType(filterModelValue) {
    if (filterModelValue.filterType === gridConstants.filterTypeExcelAlt) {
      return `in ${filterModelValue.values
        .map((value) => (value === null ? 'Blanks' : value))
        .join(',')}`;
    }

    const userFriendlyType = camelCaseToWord(
      filterModelValue.type
    ).toLowerCase();
    if ((filterModelValue.filterType = gridConstants.filterTypeTextAlt)) {
      return `${userFriendlyType} '${filterModelValue.filter}'`;
    }

    if (filterModelValue.filterType === gridConstants.filterTypeNumberAlt) {
      return filterModelValue.type === 'inRange'
        ? ` ${userFriendlyType} ${filterModelValue.filter} - ${filterModelValue.filterTo}`
        : ` ${userFriendlyType} ${filterModelValue.filter}`;
    }
    // only remaining type is Date
    const fromDate = this.gridutility.dateFormatter(
      filterModelValue.dateFrom,
      null,
      false
    );
    const toDate = this.gridutility.dateFormatter(
      filterModelValue.dateTo,
      null,
      false
    );
    return filterModelValue.type === 'inRange'
      ? ` ${userFriendlyType} ${fromDate} - ${toDate}`
      : ` ${userFriendlyType} ${fromDate}`;
  }

  private getColumnName(field: string): string {
    const columnDef = this.columnDefs?.find((colDef) => colDef.field === field);
    return columnDef?.headerName || columnDef?.field || '';
  }
}
