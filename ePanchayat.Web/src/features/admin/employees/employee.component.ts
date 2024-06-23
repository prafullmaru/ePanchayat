import { Component, Input } from '@angular/core';

import {
  CoreColumnDef,
  CoreGridOptions,
  CoreGridApi,
  gridConstants,
  GridUtilityService,
  ActionLinkRendererParams,
} from '@core/components';

import {
  DateInternationalizationService,
  CalendarDate,
  dateFormats,
} from '@core/services';

import { CrudOperationEnum } from '@core/models';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Employee } from './model';
import { testData } from './sampleData';

@Component({
  selector: 'employee',
  templateUrl: 'employee.component.html',
})
export class EmployeeComponent {
  @Input() mode: CrudOperationEnum;
  @Input() showOnlyDetails = false;

  manufactureDate: CalendarDate;
  modalRef: BsModalRef;

  gridOptions: CoreGridOptions;
  gridApi: CoreGridApi;
  columnDefs: CoreColumnDef[];

  employees: Employee[];

  constructor(
    private dateService: DateInternationalizationService,
    private gridUtility: GridUtilityService
  ) {}

  ngOnInit() {
    this.configureGrid();
    this.initializeDates();
    testData.subscribe((data) => (this.employees = data));
  }

  initializeDates() {
    this.manufactureDate = this.dateService.getCalendar(
      new Date(),
      dateFormats.defaultDate
    );
    this.manufactureDate.cobDt = new Date();
  }

  openDetails(params: Employee) {
    console.log(params);
  }

  private configureGrid() {
    this.gridOptions = <CoreGridOptions>{
      onGridReady: (params) => this.onGridReady(params),
    };

    this.columnDefs = this.getColumnDefs();
  }

  private onGridReady(params) {
    this.gridApi = params.api;
  }

  private getColumnDefs(): CoreColumnDef[] {
    return [
      {
        field: 'All',
        width: 60,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        floatingFilter: false,
        headerCheckboxSelectionFilteredOnly: true,
        excludeFromExport: true,
      },
      {
        field: 'employeeId',
        headerName: 'Employee Id',
        width: 90,
      },
      {
        field: 'employeeId',
        headerName: 'Details',
        width: 50,
        excludeFromExport: true,
        floatingFilter: false,
        floatingFilterComponentParams: {
          suppressFilterButton: true,
        },
        cellRenderer: gridConstants.actionLinkRenderer,
        cellRendererParams: () => ({
          actionLinkIcon: 'fas fa-arrow-up-right-from-square',
        }),
        cellRendererOutputEvent: (params) => this.openDetails(params),
      },
      {
        field: '',
        headerName: '',
        width: 120,
      },
      {
        field: '',
        headerName: '',
        width: 120,
      },
      {
        field: 'lastModifiedBy',
        headerName: 'Modified By',
        width: 90,
      },
      {
        field: 'lastModifiedOn',
        headerName: 'Modified On',
        width: 120,
        filter: gridConstants.filterTypeDate,
        valueFormatter: (params) =>
          this.gridUtility.dateFormatter(params.value, 'dd/MM/yyyy'),
      },
      {
        field: 'isActive',
        headerName: 'Is Active',
        width: 120,
      },
      {
        field: 'employeeId',
        headerName: 'Delete',
        width: 100,
        cellRenderer: gridConstants.actionLinkRenderer,
        cellRendererParams: () =>
          ({
            actionLinkText: 'Delete',
          } as ActionLinkRendererParams),
      },
    ];
  }
}
