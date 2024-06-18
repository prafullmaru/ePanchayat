/* eslint-disable @typescript-eslint/member-ordering */
import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import {
  cloneDeep,
  isChangeDefinedAndDifferent,
  isNullOrUndefined,
} from '@core/services';
import {
  ColDef,
  ColumnApi,
  FilterModifiedEvent,
  GetContextMenuItemsParams,
  MenuItemDef,
  SideBarDef,
} from 'ag-grid-community';
import { getAnimations } from '../animations/index';

// tslint:disable-next-line:disallow-direct-import
import {
  gridConstants,
  CoreColumnApi,
  CoreColumnDef,
  CoreGridApi,
  CoreGridOptions,
  CoreGridState,
  CoreGridSettingsMenuItemDef,
  CoreColumnGroupDef,
} from './model';

import { frameworkComponents } from './framework.component';
import { SelectOption } from '@core/models';
import { GridStateStore } from './grid-state.store';

@Component({
  selector: 'core-grid',
  templateUrl: './core-grid.component.html',
  styleUrls: ['./core-grid.component.scss'],
  animations: getAnimations(),
  encapsulation: ViewEncapsulation.None,
})
export class CoreGridComponent implements OnChanges, OnInit {
  @Input() width: string;
  @Input() height: string;
  @Input() minHeight = '0';
  @Input() showHeader = true;
  @Input() summaryText = '';
  @Input() suppressMainMenu = false;
  @Input() exporterCsvFilename = 'core.csv';
  @Input() skipGroupsDuringExport = false;
  @Input() showAggregatedFooter = false;
  @Input() enableCustomSelection = false;
  @Input() excelExportParams = {
    allColumns: true,
    columnGroups: true,
  };

  @Input() title = '';
  @Input() gridStateKey: string;
  @Input() enableOverlay: boolean;
  @Input() filterByItems: SelectOption[];
  @Input() groupByItems: SelectOption[];
  @Input() gridContainerClassName = '';

  @Output() filterByChange: EventEmitter<string> = new EventEmitter();
  @Output() groupByChange: EventEmitter<string> = new EventEmitter();

  activeGridSettingName: string;
  menuHeight: number;
  totalItems: number;
  selectedItems: number;
  visibleItems;
  number;
  customFrameworkComponents: any;
  customAggFuncs: { [name: string]: Function };
  sideBar: SideBarDef;
  filterModel: { [key: string]: any };
  isMouseOver = false;
  filtersActive = false;
  columnsActive = false;
  actionsActive = false;
  filterPresented = false;
  isGroupedGrid = false;
  iconsBySideBar = [];
  themeName = 'light';
  userChangedColumns: string[] = [];
  gridState: CoreGridState;
  initialFilterModel: { [key: string]: any };

  footerColumnDefs: CoreColumnDef[];
  footerGridOptions: CoreGridOptions;
  footerRowData: any[];
  userGridSettings: CoreGridSettingsMenuItemDef;
  userFiltersTabName = 'Your grid settings';

  private gridApi: CoreGridApi;
  private menuHeightOffset = 30;
  constructor(
    private datePipe: DatePipe,
    private gridStateStore: GridStateStore
  ) {}

  @HostListener('mouseover') onMouseOver() {
    this.isMouseOver = true;
  }

  @HostListener('mouseout') onMouseOut() {
    this.isMouseOver = false;
  }

  ngOnInit() {
    this.customFrameworkComponents = {
      ...this.frameworkComponents,
      ...frameworkComponents,
    };

    this.activeGridSettingName = this.gridStateKey;

    this.customAggFuncs = {
      [gridConstants.aggregationTypeAbsoluteSum]: this.aggregatorAbsoluteSum,
    };

    this.icons = {
      groupExpanded: '<i class="fal fa-chevron-down grid-col-exp-icon"/>',
      groupContracted: '<i class="fal fa-chevron-right grid-col-exp-icon"/>',
    };

    this.configureIcons();
    this.configureSideBar();

    if (this.height) {
      this.menuHeight = +this.height.replace('px', '') - this.menuHeightOffset;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const isGridpOptionsChanged = isChangeDefinedAndDifferent(
      changes.gridOptions
    );
    if (isGridpOptionsChanged) {
      this.onGridOptionsChange();
    }

    const isColumnDefsChanged = isChangeDefinedAndDifferent(changes.columnDefs);
    if (isColumnDefsChanged) {
      this.onColumnDefsChange();
    }
  }

  getHeight() {
    return !isNullOrUndefined(this.height) ? this.height : '100%';
  }

  onGridResize(gridHeight: number) {
    this.menuHeight = gridHeight - this.menuHeightOffset;
  }

  onMenuClick(isVisible: boolean) {
    if (!isVisible) {
      this.gridApi.setSideBarVisible(false);
      return;
    }

    const defaultToolPanel = this.gridOptions.getCustomMainMenuItems
      ? 'actions'
      : 'columns';
    this.gridApi.openToolPanel(defaultToolPanel);
    this.gridApi.setSideBarVisible(true);
  }

  processCellCallback(params) {
    const colDef = params.column.getColDef();

    if (colDef.valueFormatter) {
      const valueFormatterParams = {
        ...params,
        data: params.node.data,
      };
      return colDef.valueFormatter(valueFormatterParams);
    }

    const footerText =
      params.node.footer &&
      colDef.cellRendererParams &&
      colDef.cellRendererParams.footerValueGetter;
    if (footerText) {
      return footerText.toLowerCase().includes('total') ? 'Total' : footerText;
    }
    return params.value;
  }

  handleColumnsToggle() {
    this.toggleFiler('columns');
  }

  handleFilterToggle() {
    this.toggleFiler('filters');
  }

  handleActionsToggle() {
    this.toggleFiler('actions');
  }

  handleClearFilters() {
    if (!this.gridApi) {
      return;
    }
    this.gridApi.setFilterModel(null);
  }

  onFilterModelChange(newFilterModel) {
    this.gridApi.setFilterModel(newFilterModel);
  }

  private toggleFiler = (name: string) => {
    if (!this.gridApi) {
      return;
    }

    if (this.gridApi.getOpenedToolPanel() === name) {
      this.gridApi.closeToolPanel();
      this[`${name}Active`] = false;
    } else {
      this.filtersActive = false;
      this.columnsActive = false;
      this.actionsActive = false;
      this[`${name}Active`] = true;
      this.gridApi.setSideBarVisible(true);
      this.gridApi.openToolPanel(name);
    }
  };

  private onGridOptionsChange() {
    const fnOnGridReady = this.gridOptions.onGridReady;
    const fnOnModelUpdated = this.gridOptions.onModelUpdated;
    const fnOnRowSelected = this.gridOptions.onRowSelected;
    const fnOnFilterChanged = this.gridOptions.onFilterChanged;
    const fnOnFilterModified = this.gridOptions.onFilterModified;
    const fnOnRowClicked = this.gridOptions.onRowClicked;
    const fnOnRowDataUpdated = this.gridOptions.onRowDataUpdated;

    const getContextMenuItems = !this.gridOptions.getCustomContextMenuItems
      ? this.getDefaultContextMenuItems
      : (params) =>
          this.getCustomContextMenuItems(
            this.gridOptions.getCustomContextMenuItems,
            params
          );

    this.gridOptions = {
      defaultColDef: this.setDefaultColumnDef(),
      ...this.gridOptions,
      scrollbarWidth: 10,
      rememberGroupStateWhenNewData: true,
      getContextMenuItems,
      rowHeight: 23,
      loadingOverlayComponent: this.enableOverlay
        ? gridConstants.loadingOverlayComponent
        : null,
      onGridReady: (args) => this.onGridReady(fnOnGridReady, args),
      onRowDataUpdated: () => this.onRowDataUpdated(fnOnRowDataUpdated),
      onModelUpdated: () => this.onModelUpdated(fnOnModelUpdated),
      onRowSelected: () => this.onModelUpdated(fnOnRowSelected),
      onFilterChanged: () => this.onFilterChanged(fnOnFilterChanged),
      onFilterModified: (params) =>
        this.onFilterModified(fnOnFilterModified, params),
      onRowClicked: (params) => this.onRowClicked(fnOnRowClicked, params),
    };

    if (this.showAggregatedFooter) {
      this.footerGridOptions = {
        rowHeight: 26,
        groupMultiAutoColumn: this.gridOptions.groupMultiAutoColumn,
        groupSuppressAutoColumn: this.gridOptions.groupSuppressAutoColumn,
        alignedGrids: [this.gridOptions],
        suppressHorizontalScroll: true,
        suppressColumnVirtualisation: true,
        onGridReady: (args) => args.api.hideOverlay(),
      };
      this.gridOptions.alignedGrids = [this.footerGridOptions];
    }
  }

  private setDefaultColumnDef(): ColDef {
    return {
      resizable: true,
      sortable: true,
      floatingFilter: this.floatingFilter,
    };
  }

  private onColumnDefsChange() {
    const processColumnDef = (
      column: CoreColumnDef,
      parentColumnDef: CoreColumnGroupDef
    ) => {
      if (!column.filterParams) {
        column.filterParams = {};
      }

      column.floatingFilterComponent = gridConstants.floatingFilterComponent;
      column.filterParams.newRowsAction = 'keep';
      column.enableCellChangeFlash = true;
      column.suppressMenu = isNullOrUndefined(column.suppressMenu)
        ? true
        : column.suppressMenu;

      if (!column.filter) {
        column.filter = gridConstants.filterTypeText;
      }

      if (column.filter === gridConstants.filterTypeDate) {
        column.filterParams.defaultOption =
          column.filterParams.defaultOption || gridConstants.filterOptionExact;
        column.filterParams.comparator = (filter, cell) =>
          this.dateComparator(filter, cell);
      }

      if (column.filter === gridConstants.filterTypeNumber) {
        column.filterParams.defaultOption =
          column.filterParams.defaultOption || gridConstants.filterOptionExact;
      }

      if (
        !isNullOrUndefined(column.rowGroup) ||
        isNullOrUndefined(column.rowGroupIndex) ||
        isNullOrUndefined(column.showRowGroup)
      ) {
        this.isGroupedGrid = true;
      }

      // suppress exceptions in value formatter, getter, renderer - bcoz, it causes the whole Grid to Fail rendering
      const fnNames = ['valueFormatter', 'valueGetter', 'cellRendererParams'];
      for (const fnName of fnNames) {
        if (column[fnName] && typeof column[fnName] == 'function') {
          const fnOriginal = column[fnName];
          column[fnName] = (params) => {
            try {
              return fnOriginal(params);
            } catch {}
          };
        }
      }

      column.enablePivot = true;
      column.enableRowGroup = true;
      column.enableValue = true;

      this.enableBorderForGroupedColumns(column, parentColumnDef);
    };

    this.isGroupedGrid = false;
    this.processColumnDefs(this.columnDefs, processColumnDef);

    if (this.showAggregatedFooter) {
      this.calculateFooterColumnDefs();
    }

    if (!this.isGroupedGrid || this.gridOptions.groupSuppressAutoColumn) {
      return;
    }

    const autoGroupColumnDef = this.gridOptions.autoGroupColumnDef || {};
    autoGroupColumnDef.filter =
      autoGroupColumnDef.filter ?? gridConstants.filterTypeText;
    autoGroupColumnDef.floatingFilterComponent =
      gridConstants.floatingFilterComponent;
    autoGroupColumnDef.filterParams = autoGroupColumnDef.filterParams ?? {
      defaultOption: gridConstants.filterOptionContains,
    };
    autoGroupColumnDef.minWidth = autoGroupColumnDef.minWidth ?? 150;
    autoGroupColumnDef.maxWidth = autoGroupColumnDef.maxWidth ?? 250;
    autoGroupColumnDef.filterValueGetter = (params) =>
      params.data[params.column.getColDef().showRowGroup as string];
    this.gridOptions.autoGroupColumnDef = autoGroupColumnDef;
  }

  private enableBorderForGroupedColumns(
    column: CoreColumnDef,
    parentColumnDef: CoreColumnGroupDef
  ) {
    if (!parentColumnDef || !parentColumnDef.enableBorder) {
      return;
    }

    if (!this.gridOptions.suppressColumnVirtualisation) {
      console.error(
        'Column Virtualization needs to be suppressed, if Column Group Broder feature is enabled'
      );
      return;
    }

    const headerClassOriginal = parentColumnDef.headerClass || [];
    parentColumnDef.headerClass = (params) => [
      ...this.extractProvidedCellClass(headerClassOriginal, params),
      'border-enabled',
    ];

    // below classes are for giving borders to groups
    const groupIndex = this.columnDefs.findIndex(
      (currentColumn) => currentColumn === parentColumnDef
    );
    for (let index = 0; index < parentColumnDef.children.length; index++) {
      const childColumn = parentColumnDef.children[index];
      if (childColumn !== column) {
        continue;
      }

      let childCssClass = '';
      if (index === 0) {
        childCssClass = 'column-group-first-child';
      } else if (index === parentColumnDef.children.length - 1) {
        childCssClass = 'column-group-last-child';
      }

      const cellClassOriginal = (childColumn as CoreColumnDef).cellClass || [];
      column.cellClass = (params) => [
        ...this.extractProvidedCellClass(cellClassOriginal, params),
        `column-group-${groupIndex}`,
        childCssClass,
      ];

      const footerCellClassOriginal =
        (childColumn as CoreColumnDef).footerCellClass || [];
      column.footerCellClass = (params) => [
        ...this.extractProvidedCellClass(footerCellClassOriginal, params),
        `column-group-${groupIndex}`,
        childCssClass,
      ];

      let headerCssClass = '';
      if (index === 0) {
        headerCssClass = 'column-group-header-first-child';
      } else if (index == parentColumnDef.children.length - 1) {
        headerCssClass = 'column-group-header-last-child';
      }

      const childHeaderClassOriginal =
        (childColumn as CoreColumnDef).headerClass || [];
      column.headerClass = (params) => [
        ...this.extractProvidedCellClass(childHeaderClassOriginal, params),
        `column-group-header-${groupIndex}`,
        headerCssClass,
      ];

      column.filterParams = {
        ...column.filterParams,
        groupChildColumnClass: headerCssClass,
        groupId: `column-group-header-${groupIndex}`,
      };
    }
  }

  private extractProvidedCellClass(providedCellClass, params): string[] {
    return [
      ...(typeof providedCellClass === 'function'
        ? providedCellClass(params)
        : Array.isArray(providedCellClass)
        ? providedCellClass
        : [providedCellClass]),
    ];
  }

  private onGridReady(fnOriginal: Function, args: any) {
    this.gridApi = args.api;

    if (!this.enableOverlay) {
      this.gridApi.hideOverlay();
    }

    // todo.. enabel it once we have a thoughtout solution to handle confusing "loading.." message when roudata is null}
    this.extendGridApi(args.api, this.gridOptions.columnApi);
    this.extendColumnApi(args.columnApi);
    this.calculateCountSummary();
    this.applyInitialValueFilter();

    this.gridStateStore.gridReady(this.gridApi);

    fnOriginal(args);
  }

  private onRowDataUpdated(fnOriginal: Function) {
    if (!this.gridApi) {
      return;
    }

    if (this.showAggregatedFooter) {
      this.calculateFooterData();
    }
    this.applyInitialValueFilter();
    if (fnOriginal) {
      fnOriginal();
    }
  }

  private onModelUpdated(fnOriginal: Function) {
    this.calculateCountSummary();

    if (fnOriginal) {
      fnOriginal();
    }
  }

  private onFilterChanged(fnOriginal: Function) {
    if (this.showAggregatedFooter) {
      this.calculateFooterData();
    }
    this.calculateCountSummary();
    this.filterPresented = this.gridApi.isAnyFilterPresent();
    this.filterModel = this.gridApi.getFilterModel();

    if (fnOriginal) {
      fnOriginal();
    }
  }

  private onFilterModified(fnOriginal: Function, params: FilterModifiedEvent) {
    const colId = params.column.getColId();
    if (!this.userChangedColumns.includes(colId)) {
      this.userChangedColumns.push(colId);
    }

    if (fnOriginal) {
      fnOriginal();
    }
  }

  private onRowClicked(fnOriginal, params) {
    if (this.enableCustomSelection) {
      const node = params.node;
      node.setSelected(!node.isSelected(), false);
    }

    if (fnOriginal) {
      fnOriginal(params);
    }
  }

  private applyInitialValueFilter() {
    for (const column of this.columnDefs) {
      const initialValue =
        column.filterParams && column.filterParams.initialValue;
      if (!initialValue && !this.gridState?.filterModel[column.field]) {
        continue;
      }

      if (this.userChangedColumns.includes(column.field)) {
        continue;
      }

      const filterComponent = this.gridApi.getFilterInstance(column.field);
      if ((column.filter = gridConstants.filterTypeExcel)) {
        const initialModel =
          initialValue instanceof Array ? initialValue : [initialValue];
        const gridStateModel = this.gridState?.filterModel[column.field];
        const finalModel = gridStateModel
          ? gridStateModel
          : { values: initialModel };
        filterComponent.setModel(finalModel);
      }

      if (
        column.filter === gridConstants.filterTypeText ||
        column.filter === gridConstants.filterTypeNumber
      ) {
        const castedFilterComp = filterComponent as any;
        const currentFilter =
          castedFilterComp.getFilter && castedFilterComp.getFilter();
        let type =
          castedFilterComp.getDefaultType && castedFilterComp.getDefaultType();

        if (column.filterParams.defaultOption) {
          type = column.filterParams.defaultOption;
        }
        const filter = currentFilter ? currentFilter : initialValue;
        filterComponent.setModel({ type, filter });
      }

      if (column.filter === gridConstants.filterTypeDate) {
        const gridStateModel = this.gridState?.filterModel[column.field];
        const finalModel = gridStateModel
          ? gridStateModel
          : {
              dateFrom: initialValue.initialDateFrom,
              dateTo: initialValue.initialDateTo,
              filter: gridConstants.filterTypeDate,
              type: gridConstants.filterOptionInRange,
            };
        filterComponent.setModel(finalModel);
      }
      this.gridApi.onFilterChanged();
    }
  }

  private getDefaultContextMenuItems(
    params: GetContextMenuItemsParams
  ): (string | MenuItemDef)[] {
    return params.defaultItems;
  }

  private getCustomContextMenuItems(
    fnOriginal: Function,
    params: GetContextMenuItemsParams
  ): (MenuItemDef | string)[] {
    const defaultItems = [
      'copy',
      {
        name: 'Export',
        icon: '<i class="ag-icon ag-icon-save"/>',
        subMenu: [
          {
            name: 'CSV Export',
            action: () => this.gridApi.exportDataAsCsv(this.excelExportParams),
          },
          {
            name: 'Excel Export (.xlsx)',
            action: () =>
              this.gridApi.exportDataAsExcel(this.excelExportParams),
          },
          {
            name: 'Excel Export (.xml)',
            action: () => this.gridApi.exportDataAsExcel({ exportMode: 'xml' }),
          },
        ],
      },
    ];

    if (!fnOriginal) {
      return defaultItems;
    }

    return [...fnOriginal(params), 'separator', ...defaultItems];
  }

  private extendGridApi(gridApi: CoreGridApi, columnApi: ColumnApi) {
    gridApi.setGridState = (gridState: CoreGridState) => {
      this.gridState = gridState;
      if (!gridState) {
        return;
      }

      // resetColumnState method doesnt bring back the initial filters, so we need explcit code to preserve it during
      this.initialFilterModel = gridApi.getFilterModel();
      gridApi.setFilterModel(gridState.filterModel);
      columnApi.applyColumnState({
        state: gridState.columnState,
        applyOrder: true,
      });
    };

    gridApi.resetGridState = () => {
      this.gridState = null;
      columnApi.resetColumnState();
      gridApi.setFilterModel(this.initialFilterModel);
    };

    gridApi.getGridState = (): CoreGridState => ({
      columnState: columnApi.getColumnState(),
      filterModel: gridApi.getFilterModel(),
    });

    gridApi.getVisibleRows = () => {
      const entities = [];
      const count = gridApi.getDisplayedRowCount();
      for (let index = 0; index < count; index++) {
        const rowNode = this.gridApi.getDisplayedRowAtIndex(index);
        entities.push(rowNode.data);
      }
      return entities;
    };

    gridApi.updateRowDataAndFooterData = (transaction) => {
      gridApi.updateRowData(transaction);
      this.calculateFooterData();
    };

    gridApi.refreshFooterData = () => {
      this.calculateFooterData();
    };
  }

  private extendColumnApi(columnApi: CoreColumnApi) {
    columnApi.setColumnsApplicable = (columns, isApplicable) => {
      this.processColumnDefs(
        this.columnDefs,
        (columnDef) =>
          (columnDef.isApplicable = columns.includes(columnDef.field)
            ? isApplicable
            : columnDef.isApplicable)
      );
    };
  }

  private calculateFooterColumnDefs() {
    this.footerColumnDefs = cloneDeep(this.columnDefs);

    const processColumnDef = (columnDef: CoreColumnDef) => {
      if (columnDef.footerAggregationFormatter) {
        columnDef.valueFormatter = columnDef.footerAggregationFormatter;
      }

      columnDef.cellClass = columnDef.footerCellClass || '';
      columnDef.cellRendererParams = {
        suppressCount: true,
      };

      columnDef.checkboxSelection = null;
      columnDef.headerCheckboxSelection = null;
    };
    this.processColumnDefs(this.footerColumnDefs, processColumnDef);
  }

  private calculateFooterData() {
    if (!this.gridApi) {
      return;
    }

    const footerRowData = {};
    const visibleRows = this.gridApi.getVisibleRows();
    if (!visibleRows) {
      return;
    }

    const processColumnDef = (columnDef: CoreColumnDef) => {
      if (columnDef.footerAggregationText) {
        footerRowData[columnDef.field] = columnDef.footerAggregationText;
        return;
      }

      if (!columnDef.footerAggregationType) {
        return;
      }

      let result;
      const columnValues: number[] = visibleRows
        .filter((row) => row)
        .map((row) => this.getNestedPropertyValue(row, columnDef.field))
        .map((columnValue) => +columnValue)
        .filter(
          (columnValue) =>
            typeof columnValue === 'number' && !isNaN(columnValue)
        );

      result = columnValues.reduce((a, b) => a + b, 0);

      if (
        columnDef.footerAggregationType === gridConstants.aggregationTypeAvg
      ) {
        result = result / columnValues.length;
      }

      this.setNestedPropertyValue(footerRowData, columnDef.field, result);
    };

    this.processColumnDefs(this.columnDefs, processColumnDef);
    this.footerRowData = [footerRowData];
  }

  private aggregatorAbsoluteSum(values: number[]) {
    return values.reduce(
      (prevValue, currentValue) => prevValue + Math.abs(currentValue),
      0
    );
  }

  private calculateCountSummary() {
    if (!this.gridApi || !this.rowData) {
      return;
    }

    this.visibleItems = this.gridApi
      .getVisibleRows()
      .filter((row) => row).length;
    this.selectedItems = this.gridApi.getSelectedRows().length;
    this.totalItems = this.rowData.length;
  }

  private dateComparator(filterLocalDateAtMidnight, cellValue) {
    if (!cellValue) {
      return -1;
    }

    const dateParts = this.datePipe
      .transform(cellValue, 'MM/dd/yyyy')
      .split('/');
    const day = Number(dateParts[1]);
    const month = Number(dateParts[0]) - 1;
    const year = Number(dateParts[2]);
    const cellDate = new Date(year, month, day);

    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    } else if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    } else {
      return 0;
    }
  }

  private getNestedPropertyValue(data: any, field: string): any {
    if (!field) {
      return;
    }

    let leafPropValue = data;
    field
      .split('.')
      .forEach(
        (prop) => (leafPropValue = leafPropValue && leafPropValue[prop])
      );
    return leafPropValue;
  }

  private setNestedPropertyValue(data: any, field: string, value: string) {
    if (!field) {
      return;
    }

    const propNames = field.split('.');
    let leafPropValue = data;
    for (let index = 0; index < propNames.length; index++) {
      const propName = propNames[index];
      if (index === propNames.length - 1) {
        leafPropValue[propName] = value;
      } else {
        leafPropValue[propName] = leafPropValue[propName] || {};
        leafPropValue = leafPropValue[propName];
      }
    }
  }

  private processColumnDefs(
    columnDefs: CoreColumnDef[],
    fnProcess: (colDef: CoreColumnDef, parentColDef?: CoreColumnDef) => void
  ) {
    for (const columnDef of columnDefs) {
      const children = (columnDef as any).children;
      if (children) {
        children.forEach((childColumnDef) =>
          fnProcess(childColumnDef, columnDef)
        );
      } else {
        fnProcess(columnDef);
      }
    }
  }

  private configureIcons() {
    this.icons = {
      actions: '<i class="fal fa-bolt"></i>',
    };
  }

  private configureSideBar() {
    this.sideBar = {
      hiddenByDefault: true,
      toolPanels: [
        {
          id: 'actions',
          labelDefault: 'Actions',
          labelKey: 'Actions',
          iconKey: 'actions',
          toolPanel: gridConstants.actionsPanelComponent,
          toolPanelParams: {
            suppressRowGroups: true,
            suporessValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
          },
        },
        'columns',
        'filters',
      ],
    };

    this.iconsBySideBar = this.sideBar.toolPanels?.map((panel) =>
      typeof panel === 'string' ? panel : panel.id
    );
  }

  // inputs
  @Input() gridOptions: CoreGridOptions;
  @Input() slaveGrids: any = undefined;
  @Input() rowData: any = undefined;
  @Input() floatingTopRowData: any = undefined;
  @Input() floatingBottomRowData: any = undefined;
  @Input() columnDefs: CoreColumnDef[] = undefined;
  @Input() defaultColDef: any = undefined;
  @Input() rowStyle: any = undefined;
  @Input() context: any = undefined;
  @Input() groupColumnDef: any = undefined;
  @Input() localeText: any = undefined;
  @Input() icons: any = undefined;
  @Input() datasource: any = undefined;
  @Input() suppressAggFuncInHeader: boolean;
  @Input() enterpriseDatasource: any = undefined;
  @Input() viewportDatasource: any = undefined;
  @Input() groupRowRendererParams: any = undefined;
  @Input() aggFuncs: any = undefined;
  @Input() fullWidthCellRendererParams: any = undefined;
  @Input() sortingOrder: any = undefined;
  @Input() rowClass: any = undefined;
  @Input() rowSelection: any = true;
  @Input() overlayLoadingTemplate: any = undefined;
  @Input() overlayNoRowsTemplate: any = undefined;
  @Input() quickFilterText: any = undefined;
  @Input() rowModelType: any = undefined;
  @Input() rowHeight: any = undefined;
  @Input() rowBuffer: any = undefined;
  @Input() colWidth: any = undefined;
  @Input() headerHeight: any = undefined;
  @Input() groupDefaultExpanded: any = undefined;
  @Input() minColWidth: any = undefined;
  @Input() maxColWidth: any = undefined;
  @Input() viewportRowModelPageSize: any = undefined;
  @Input() viewportRowModelBufferSize: any = undefined;
  @Input() layoutInterval: any = undefined;
  @Input() autoSizePadding: any = undefined;
  @Input() maxPagesInCache: any = undefined;
  @Input() maxConcurrentDatasourceRequests: any = undefined;
  @Input() paginationOverflowSize: any = undefined;
  @Input() paginationPageSize: any = undefined;
  @Input() paginationInitialRowCount: any = undefined;
  @Input() localeTextFunc: any = undefined;
  @Input() groupRowInnerRenderer: any = undefined;
  @Input() groupRowRenderer: any = undefined;
  @Input() isScrollLag: any = undefined;
  @Input() isExternalFilterPresent: any = undefined;
  @Input() getRowHeight: any = undefined;
  @Input() doesExternalFilterPass: any = undefined;
  @Input() getRowClass: any = undefined;
  @Input() getRowStyle: any = undefined;
  @Input() traverseNode: any = undefined;
  @Input() getContextMenuItems: any = undefined;
  @Input() getMainMenuItems: any = undefined;
  @Input() processRowPostCreate: any = undefined;
  @Input() processCellForClipboard: any = undefined;
  @Input() getNodeChildDetails: any = undefined;
  @Input() groupRowAggNodes: any = undefined;
  @Input() getRowNodeId: any = undefined;
  @Input() isFullWidthCell: any = undefined;
  @Input() fullWidthCellRenderer: any = undefined;
  @Input() doesDataFlower: any = undefined;
  @Input() suppressRowClickSelection: any = undefined;
  @Input() suppressCellSelection: any = undefined;
  @Input() suppressHorizontalScroll: any = undefined;
  @Input() suppressScrollOnNewData: any = undefined;
  @Input() debug: any = undefined;
  @Input() enableCellExpressions: any = undefined;
  @Input() enableServerSideSorting: any = undefined;
  @Input() enableServerSideFilter: any = undefined;
  @Input() angularCompileRows: any = undefined;
  @Input() angularCompileFilters: any = undefined;
  @Input() angularCompileHeaders: any = undefined;
  @Input() groupSuppressAutoColumn: any = undefined;
  @Input() groupSelectsChildren: any = undefined;
  @Input() groupIncludeFooter: any = undefined;
  @Input() groupUseEntireRow: any = undefined;
  @Input() groupSuppressRow: any = undefined;
  @Input() groupSuppressBlankHeader: any = undefined;
  @Input() forPrint: any = undefined;
  @Input() suppressMenuHide: any = undefined;
  @Input() rowDeselection: any = undefined;
  @Input() unSortIcon: any = undefined;
  @Input() suppressMultiSort: any = undefined;
  @Input() suppressScrollLag: any = undefined;
  @Input() singleClickEdit: any = undefined;
  @Input() suppressLoadingOverlay: any = undefined;
  @Input() suppressNoRowsOverlay: any = undefined;
  @Input() suppressAutoSize: any = undefined;
  @Input() suppressParentsInRowNodes: any = undefined;
  @Input() showToolPanel: any = undefined;
  @Input() suppressColumnMoveAnimation: any = undefined;
  @Input() suppressMovableColumns: any = undefined;
  @Input() suppressFieldDotNotation: any = undefined;
  @Input() enableRangeSelection: any = true;
  @Input() suppressEnterprise: any = undefined;
  @Input() rowGroupPanelShow: any = undefined;
  @Input() pivotPanelShow;
  any = undefined;
  @Input() suppressContextMenu: any = undefined;
  @Input() suppressMenuFilterPanel: any = undefined;
  @Input() suppressMenuMainPanel: any = undefined;
  @Input() suppressMenuColumnPanel: any = undefined;
  @Input() enableStatusBar: any = undefined;
  @Input() rememberGroupStateWhenNewData: any = undefined;
  @Input() enableCellChangeFlash: any = undefined;
  @Input() suppressDragLeaveHidesColumns: any = undefined;
  @Input() suppressMiddleClickScrolls: any = undefined;
  @Input() suppressPreventDefaultOnMouseWheel: any = undefined;
  @Input() suppressUseColIdForGroups: any = undefined;
  @Input() suppressCopyRowsToClipboard: any = undefined;
  @Input() pivotMode: any = undefined;
  @Input() treeData: any = undefined;
  @Input() suppressColumnVirtualisation: any = undefined;
  @Input() suppressFocusAfterRefresh: any = undefined;
  @Input() functionsPassive: any = undefined;
  @Input() functionsReadOnly: any = undefined;
  @Input() defaultColGroupDef: any = undefined;
  @Input() editType: any = undefined;
  @Input() scrollbarWidth: any = undefined;
  @Input() groupRowInnerRendererFramework: any = undefined;
  @Input() groupRowRendererFramework: any = undefined;
  @Input() fullwidthCellRendererFramework: any = undefined;
  @Input() processSecondaryColDef: any = undefined;
  @Input() processSecondaryColGroupDef: any = undefined;
  @Input() suppressRowHoverClass: any = undefined;
  @Input() suppressTouch: any = undefined;
  @Input() animateRows: any = true;
  @Input() groupSelectsFiltered: any = undefined;
  @Input() groupRemoveSingleChildren: any = undefined;
  @Input() getBusinessKeyForNode: any = undefined;
  @Input() checkboxSelection: any = undefined;
  @Input() enableRt1: any = undefined;
  @Input() suppressClickEdit: any = undefined;
  @Input() enableRt1Support: any = undefined;
  @Input() excelstyles: any = undefined;
  @Input() dateComponent: any = undefined;
  @Input() dateComponentFramework: any = undefined;
  @Input() dateComponentParams: any = undefined;
  @Input() sendToClipboard: any = undefined;
  @Input() navigateToMextCell: any = undefined;
  @Input() tabToNextCell: any = undefined;
  @Input() processCellFromClipboard: any = undefined;
  @Input() getDocument: any = undefined;
  @Input() enableGroupEdit: any = undefined;
  @Input() embedFullwidthRows: any = undefined;
  @Input() suppressTabbing: any = undefined;
  @Input() suppressPaginationPanel: any = undefined;
  @Input() paginationStartPage: any = undefined;
  @Input() floatingFilter: any = true;
  @Input() groupHideOpenParents: any = undefined;
  @Input() defaultExportParans: any = undefined;
  @Input() infiniteBlockSize: any = undefined;
  @Input() infiniteInitialRowCount: any = undefined;
  @Input() allowContextMenuWithControlKey: any = true;
  @Input() groupMultiAutoColumn: any = undefined;
  @Input() pagination: any = undefined;
  @Input() stopEditingWhenGridLosesFocus: any = undefined;
  @Input() paginationAutoPageSize: any = undefined;
  @Input() groupHeaderHeight: any = undefined;
  @Input() floatingFiltersHeight: any = undefined;
  @Input() pivotHeaderHeight: any = undefined;
  @Input() pivotGroupHeaderHeight: any = undefined;
  @Input() maxBlocksInCache: any = undefined;
  @Input() cacheOverflowSize: any = undefined;
  @Input() suppressAggAtRootLevel: any = undefined;
  @Input() purgeClosedRowNodes: any = undefined;
  @Input() postProcessPopup: any = undefined;
  @Input() suppressAsyncEvents: any = undefined;
  @Input() cacheQuickFilter: any = undefined;
  @Input() domLayout: any = undefined;
  @Input() deltaRowDataMode: any = undefined;
  @Input() romDataUpdated: any = undefined;
  @Input() autoGroupColumnDef: any = undefined;
  @Input() clipboardDeliminator: any = undefined;
  @Input() enforceRowDomOrder: any = undefined;
  @Input() accentedSort: any = undefined;
  @Input() pivotTotals: any = undefined;
  @Input() alignedGrids: any = undefined;
  @Input() colunTypes: any = undefined;
  @Input() cacheBlockSize: any = undefined;
  @Input() suppressChangeDetection: any = undefined;
  @Input() valueCache: any = undefined;
  @Input() valueCachelleverExpires: any = undefined;
  @Input() aggregateOnlyChangedColumns: any = undefined;
  @Input() pinnedTopRowData: any = undefined;
  @Input() pinnedBottomRowData: any = undefined;
  @Input() pinnedRowDataChanged: any = undefined;
  @Input() alwaysShowStatusBar: any = undefined;
  @Input() ensureDomOrder: any = undefined;
  @Input() components: any = undefined;
  @Input() frameworkComponents: any = undefined;
  @Input() rowloverClass: any = undefined;
  @Input() suppressAnimationFrame: any = undefined;
  @Input() suppressExcelExport: any = undefined;
  @Input() suppressCsvExport: any = undefined;
  @Input() getChildCount: any = undefined;
  @Input() getDataPath: any = undefined;
  @Input() rowClassRules: any = undefined;
  @Input() getRowClassRules: any = undefined;
  @Input() groupRemoveLowestSingleChildren: any = undefined;
  @Input() detailRowHeight: any = undefined;
  @Input() detailGridOptions: any = undefined;
  @Input() getDetailRowData: any = undefined;
  @Input() masterDetail: any = undefined;
  @Input() detailCellRenderer: any = undefined;
  @Input() detailCellRendererFramework: any = undefined;
  @Input() detailCellRendererParams: any = undefined;
  @Input() loadingOverlayComponent: any = undefined;
  @Input() loadingOverlayComponentFramework: any = undefined;
  @Input() loadingOverlayComponentParams: any = undefined;
  @Input() noRowsOverlayComponent: any = undefined;
  @Input() noRowsOverlayComponentFramework: any = undefined;
  @Input() noRowsOverlayComponentParams: any = undefined;

  /* Outputs
   */

  @Output() gridReady: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnEverythingChanged: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() newColumnsLoaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnPivotModeChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnRowGroupChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnPivotChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() gridColumnsChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnValueChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnMoved: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnVisible: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnPinned: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnGroupOpened: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnResized: EventEmitter<any> = new EventEmitter<any>();
  @Output() displayedColumnsChanged: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() virtualColumnsChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowGroupOpened: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDataChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() floatingRowDataChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() rangeSelectionChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnRowGroupAddRequest: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() columnRowGroupRemoveRequest: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() columnPivotAddRequest: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnPivotRemoveRequest: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() columnValueAddRequest: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnValueRemoveRequest: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() columnAggFuncChangeRequest: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() clipboardPaste: EventEmitter<any> = new EventEmitter<any>();
  @Output() modelUpdated: EventEmitter<any> = new EventEmitter<any>();
  // @Output() cellclicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellDoubleClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellContextMenu: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellValueChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellFocused: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterModified: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() virtualRowRemoved: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowDoubleClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() gridSizeChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewportChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() dragStarted: EventEmitter<any> = new EventEmitter<any>();
  @Output() dragStopped: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemsAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemsRemoved: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnRowGroupChangeRequest: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() columnPivotChangeRequest: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() columnValueChangeRequest: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() rowValueChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() bodyScroll: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowEditingStarted: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowEditingStopped: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellEditingStarted: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellEditingStopped: EventEmitter<any> = new EventEmitter<any>();
  @Output() displayedColumnswidthChanged: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() scrollVisibilityChanged: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() flashCells: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellMouseOver: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellMouseOut: EventEmitter<any> = new EventEmitter<any>();
  @Output() columnHoverChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() paginationReset: EventEmitter<any> = new EventEmitter<any>();
  @Output() paginationPageLoaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() paginationPageRequested: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() paginationChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() bodyHeightChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() componentStateChanged: EventEmitter<any> = new EventEmitter<any>();

  // deprecated
  @Output() beforeFilterChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() afterFilterChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() beforeSortChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() afterSortChanged: EventEmitter<any> = new EventEmitter<any>();
}
