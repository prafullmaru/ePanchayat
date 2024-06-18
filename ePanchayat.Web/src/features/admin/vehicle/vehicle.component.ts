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

import { CrudOperationEnum, TabInfo } from '@core/models';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Vehicle } from './model';
import { testData } from './sampleData';

@Component({
  selector: 'vehicle',
  templateUrl: 'vehicle.component.html',
})
export class VehicleComponent {
  @Input() mode: CrudOperationEnum;
  @Input() showOnlyDetails = false;

  manufactureDate: CalendarDate;

  tabs: TabInfo[];
  activeTab: TabInfo;
  loadedTabs: string[];
  modalRef: BsModalRef;

  gridOptions: CoreGridOptions;
  gridApi: CoreGridApi;
  columnDefs: CoreColumnDef[];

  vehicles: Vehicle[];

  constructor(
    private dateService: DateInternationalizationService,
    private gridUtility: GridUtilityService
  ) {}

  ngOnInit() {
    this.configureGrid();
    this.initializeDates();
    testData.subscribe((data) => (this.vehicles = data));

    this.initTabs();
    this.activeTab = this.tabs.find((tab) => tab.isActive);
    this.loadedTabs = [this.activeTab.description];
  }

  initializeDates() {
    this.manufactureDate = this.dateService.getCalendar(
      new Date(),
      dateFormats.defaultDate
    );
    this.manufactureDate.cobDt = new Date();
  }

  initTabs() {
    this.tabs = [
      {
        description: '2 Wheeler',
        isActive: true,
        isLoaded: true,
      },
      { description: '4 Wheeler' },
      { description: 'Tractor' },
      { description: 'Truck' },
      { description: 'Bus' },
      { description: 'Others' },
    ];
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
        field: 'id',
        headerName: 'ID',
        width: 60,
      },
      {
        field: 'registrationNumber',
        headerName: 'Registration Number',
        width: 120,
      },
      {
        field: 'owner',
        headerName: 'Owner',
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
        field: 'id',
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
