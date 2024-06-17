import {
  GridOptions,
  ColDef,
  GridApi,
  MenuItemDef,
  ColGroupDef,
  ColumnApi,
} from 'ag-grid-community';

// import { DataType } from '@core/models';
// import { Observable } from '../rxjs-exports';

export interface CoreGridOptions extends GridOptions {
  getCustomContextMenuItems?(params): MenuItemDef[];
  getCustomMainMenuItems?(): MenuItemDef[];
}

export interface CustomColumnDef {
  cellRendererOutputEvent?: Function;
  footerCellClass?: any;
  footerAggregationText?: string;
  footerAggregationType?: string;
  footerAggregationFormatter?: (params: any) => string | string;
}

export interface CoreColumnDef extends ColDef, CustomColumnDef {
  customCell?: string;
  isApplicable?: boolean;
  sort?: any; // hack to suppress the asc|desc type validation from ag grid
  excludeFromExport?: boolean;
}

export interface CoreColumnGroupDef extends ColGroupDef, CustomColumnDef {
  customCell?: string;
  field?: string;
  enableBorder?: boolean;
}

export interface CoreMenuItemDef extends MenuItemDef {
  isColumnShown?: boolean;
  field?: string;
  icon?: string;
  menuItemType?: MenuItemType;
}

export interface CoreGridSettingsMenuItemDef extends CoreMenuItemDef {
  savedGridSettings?: SavedGridSetting[];
  defaultSetting?: SavedGridSetting;
  showActiveGridSettingName?: boolean;
}

export interface CoreGridPreferenceRequest {
  selectedGridSettings: string;
  saveGridSettings: string[];
}

export interface SavedGridSetting {
  name: string;
  gridState?: CoreGridState;
}

export enum GridSettingsMethod {
  Delete = 'delete',
  Select = 'select',
  Add = 'add',
}

export interface GridSettingAction {
  action: GridSettingsMethod;
  gridSettingName: string;
}

export enum MenuItemType {
  Default,
  GridSettings,
  GridSettingInput,
}

export interface CoreGridApi extends GridApi {
  getGridState?(): CoreGridState;
  resetGridState?(): void;
  setGridState?(state: CoreGridState): void;
  getVisibleRows?(): any[];
  updateRowDataAndFooterData?(delta: any): void;
  refreshFooterData?(): void;
}

export interface CoreGridApiGeneric<T> extends GridApi<T> {
  getGridState?(): CoreGridState;
  resetGridState?(): void;
  setGridState?(state: CoreGridState): void;
  getVisibleRows?(): any[];
  updateRowDataAndFooterData?(delta: any): void;
  refreshFooterData?(): void;
}

export interface CoreColumnApi extends ColumnApi {
  setColumnsApplicable(columns: string[], isApplicable: boolean);
}

export interface CoreGridCustomContextMenu extends MenuItemDef {
  imageIcon?: string;
}

export interface CoreGridState {
  filterModel: any;
  columnState: any;
}

export interface RenderenerParams {
  colDef?: any;
  data?: any;
}

export interface ActionLinkRendererParams extends RenderenerParams {
  propName?: string;
  actionLinkText?: string;
  actionLinkIcon?: string;
  actionLinkTitle?: string;
  actionStatus?: ActionStatus;
  actionStatusMessage?: string;
  altActionLinkText?: string;
  altActionLinkIcon?: string;
  altActionLinkTitle?: string;
  rowGroupActionLinkText?: string;
  rowGroupActionLinkIcon?: string;
  rowGroupActionLinkTitle?: string;
  rowGroupActionStatus?: ActionStatus;
  rowGroupActionStatusMessage?: string;
  altRowGroupActionLinkText?: string;
  altRowGroupActionLinkIcon?: string;
  altRowGroupActionLinkTitle?: string;

  showProgressbar?: boolean;
  node?: any;
  hide?: boolean | Function;
  disable?: boolean | Function;
}

export enum ActionStatus {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

// export interface FavoriteRendererParams extends RenderenerParams {
//   propName: string;
//   disableTabbing?: boolean;
// }

// export interface DropdownRendererParams extends RenderenerParams {
//   options: { text: string; value: string }[];
//   modelPropName: string;
//   disableTabbing?: boolean;
// }

// export interface CellWithErrorCellRendererParams extends ICellRendererParams {
//   validateError?: () => string;
// }

// export interface CoreCalendarCellEditorParams extends ICellEditorParams {
//   date: string;
//   minDate: string;
//   maxDate: string;
//   daysDisabled: number[];
//   disabledDates: Date[] | Observable<Date[]>;
//   preserveTime: boolean;
//   class: string;
//   dateOutputFormat: string;
// }

export const gridConstants = {
  filterTypeNumber: 'agNumberColumnFilter',
  filterTypeExcel: 'agSetColumnFilter',
  filterTypeText: 'agTextColumnFilter',
  filterTypeDate: 'agDateColumnFilter',
  filterTypeTextAlt: 'text',
  filterTypeExcelAlt: 'set',
  filterTypeDateAlt: 'date',
  filterTypeNumberAlt: 'number',

  editorTypeSelect: 'agSelectCellEditor',
  editorTypeRichSelect: 'agRichSelectCellEditor',
  editorTypeLargeText: 'agLarge TextCellEditor',

  columnTypeDate: 'dateColumn',

  filterOptionStartsWith: 'startsWith',
  filterOptionEndsWith: 'endsWith',
  filterOptionContains: 'contains',
  filterOptionNotContains: 'notContains',
  filterOptionExact: 'equals',
  filterOptionGreaterThan: 'greaterThan',
  filterOptionGreaterThanOrEqual: 'greaterThanOrEqual',
  filterOptionLessThan: 'lessThan',
  filterOptionLessThanOrEqual: 'lessThanOrEqual',
  filterOptionInRange: 'inRange',

  aggregationTypeSum: 'sum',
  aggregationTypeAbsoluteSum: 'absoluteSum',
  aggregationTypeAvg: 'avg',

  sortDirectionAsc: 'asc',
  sortDirectionDesc: 'desc',

  actionLinkRenderer: 'actionLinkRenderer',
  actionLinksRenderer: 'actionLinksRenderer',
  checkboxRenderer: 'checkboxRenderer',
  footerRenderer: 'footerRenderer',
  highlightRenderer: 'highlightRenderer',
  groupCe11Renderer: 'agGroupCellRenderer',
  favoriteRenderer: 'favoriteRenderer',
  dropdownRenderer: 'dropdownRenderer',
  amountInputRenderer: 'amountInputRenderer',
  amountInputEditor: 'amountInputEditor',
  valueDiffRenderer: 'valueDiffCellRenderer',
  cellWithErrorRenderer: 'cellWithErrorCellRenderer',
  actionLinkOrValueCellRenderer: 'actionLinkOrValueCellRenderer',

  dropDownEditor: 'dropDownEditor',
  datePickerEditor: 'datePickerEditor',
  rookCalendarEditor: 'rookCalendarCellEditor',
  accountEditor: 'accountEditor',

  floatingFilterComponent: 'floatingFilterComponent',
  expandCollapseHeader: 'expandCollapseHeader',
  actionsPanelComponent: 'actionsPanelComponent',
  loadingOverlayComponent: 'rookLoadingOverlayComponent',
  requiredColumnHeader: 'requiredColumnHeader',

  groupDisplayTypeSingle: 'singleColumn',
  groupDisplayTypeMultiple: 'multipleColumns',
};

// export interface GridHeaderDefinition {
//   header: string;
//   dataType: DataType;
//   childHeaders?: ChildGridHeaderDefinition[];
// }

// export interface ChildGridHeaderDefinition {
//   header: string;
//   dataType: DataType;
// }

// export interface FilterPill {
//   columnName?: string;
//   expressionValue?: string;
//   columnId?: string;
// }

// // ag grid doesnt provide interface for filterModel. we should ideallly create multiple models
// // becoz data is populated in diff properties based on FilterType, for now using a unified model to avoid type casting
// export interface FilterModel {
//   type?: string;
//   filter?: string;
//   dateFrom?: string;
//   dateTo?: string;
//   values?: string[];
//   condition1: FilterModel;
//   condition2: FilterModel;
//   operator?: string;
// }

// export interface RequiredColumnHeaderParams extends IHeaderParams {
//   required: boolean | Function;
//   icon: string;
//   tooltip: string;
// }
