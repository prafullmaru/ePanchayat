import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  Subject,
  mergeMap,
  map,
  iif,
} from '../rxjs-exports';
import {
  CoreGridSettingsMenuItemDef,
  SavedGridSetting,
  CoreGridState,
  CoreGridPreferenceRequest,
  CoreGridApi,
  MenuItemType,
  CoreMenuItemDef,
} from './model';
import { UserPreferencesDataService, cloneDeep } from '@core/services';
import { CsvExportParams } from 'ag-grid-community';

@Injectable()
export class ActionPanelStateStore {
  defaultSetting: SavedGridSetting;
  private readonly userFiltersTabName = 'Your grid settings';

  private menuItemsStateSubject = new BehaviorSubject<
    CoreGridSettingsMenuItemDef[]
  >([]);
  private activeGridSettingSubject = new Subject<SavedGridSetting>();
  private gridStateKey: string;
  private actionPanelState: {
    menuItems: CoreGridSettingsMenuItemDef[];
    activeGridSetting: SavedGridSetting;
  } = { menuItems: [], activeGridSetting: null };

  constructor(private preferenceService: UserPreferencesDataService) {}

  get menuItemState(): Observable<CoreGridSettingsMenuItemDef[]> {
    return this.menuItemsStateSubject.asObservable();
  }
  get activeGridSetting(): Observable<SavedGridSetting> {
    return this.activeGridSettingSubject.asObservable();
  }

  async loadGridSettings(
    fnOriginal: Function,
    gridStateKey: string,
    gridApi: CoreGridApi,
    filedName: string,
    processCellCallback: (params: any) => any,
    skipGroups: boolean
  ) {
    this.actionPanelState.menuItems = this.getMenuItems(
      gridStateKey,
      fnOriginal,
      gridApi,
      filedName,
      processCellCallback,
      skipGroups
    );
    this.menuItemsStateSubject.next(cloneDeep(this.actionPanelState.menuItems));

    if (!gridStateKey) {
      return;
    }

    const settingsMapKey = `${gridStateKey}_SettingsMap`;
    this.gridStateKey = gridStateKey;

    const combinedResponse = await this.preferenceService
      .getPreference(settingsMapKey)
      .pipe(
        mergeMap((settingsMapResponse) =>
          iif(
            () => settingsMapResponse?.selectedGridSetting,
            this.preferenceService
              .getPreference(settingsMapResponse?.selectedGridSetting)
              .pipe(
                map((activeGridSettingResponse) => ({
                  settingsMapResponse: settingsMapResponse,
                  activeGridSettingResponse,
                }))
              ),

            this.preferenceService.getPreference(gridStateKey).pipe(
              map((activeGridSettingResponse) => ({
                settingsMapResponse: null,
                activeGridSettingResponse,
              }))
            )
          )
        )
      )
      .toPromise();

    if (!combinedResponse.settingsMapResponse) {
      if (!combinedResponse.activeGridSettingResponse) {
        this.defaultSetting = { name: this.gridStateKey };
        return;
      }

      this.defaultSetting = {
        name: this.gridStateKey,
        gridState: combinedResponse.activeGridSettingResponse,
      };

      this.actionPanelState.activeGridSetting = this.defaultSetting;
      this.activeGridSettingSubject.next(
        this.actionPanelState.activeGridSetting
      );
      return;
    }

    this.defaultSetting = { name: this.gridStateKey };
    const userGridSetting = this.actionPanelState.menuItems.find(
      (menuItem) => menuItem.name === this.userFiltersTabName
    );

    userGridSetting.defaultSetting = this.defaultSetting;

    userGridSetting.savedGridSettings =
      combinedResponse.settingsMapResponse.savedGridSettings.map((setting) =>
        this.createGridSetting(setting)
      );

    this.menuItemsStateSubject.next(cloneDeep(this.actionPanelState.menuItems));

    this.actionPanelState.activeGridSetting = {
      name: combinedResponse.settingsMapResponse.selectedGridSetting,
      gridState: combinedResponse.activeGridSettingResponse,
    };
    this.activeGridSettingSubject.next(
      cloneDeep(this.actionPanelState.activeGridSetting)
    );
  }

  saveGridState(gridState: CoreGridState) {
    const updatedGridsetting = this.isDefaultSettingSelected
      ? this.defaultSetting
      : this.actionPanelState?.menuItems
          .find((menuItem) => menuItem?.name === this.userFiltersTabName)
          ?.savedGridSettings.find(
            (gridSetting) =>
              gridSetting.name ===
              this.actionPanelState?.activeGridSetting?.name
          );

    if (!updatedGridsetting) {
      this.preferenceService.setPreference(this.gridStateKey, gridState);
      return;
    }

    updatedGridsetting.gridState = cloneDeep(gridState);
    this.menuItemsStateSubject.next(this.actionPanelState.menuItems);
    this.preferenceService.setPreference(
      updatedGridsetting.name,
      updatedGridsetting.gridState
    );
  }

  resetGridState(restartedGridState: CoreGridState) {
    if (this.isDefaultSettingSelected) {
      this.preferenceService.removePreference(this.gridStateKey);
      return;
    }

    const restartedGridsetting = this.actionPanelState?.menuItems
      .find((menuItem) => menuItem?.name === this.userFiltersTabName)
      ?.savedGridSettings.find(
        (gridsetting) =>
          gridsetting.name === this.actionPanelState?.activeGridSetting?.name
      );

    if (restartedGridsetting && restartedGridState) {
      restartedGridsetting.gridState = restartedGridState;
      this.preferenceService.setPreference(
        this.actionPanelState.activeGridSetting.name,
        restartedGridState
      );
      this.menuItemsStateSubject.next(this.actionPanelState.menuItems);
    }
  }

  addNewPreference(preferenceName: string, gridState: CoreGridState) {
    const savedGridSettingsTab = this.actionPanelState.menuItems.find(
      (menuItem) => menuItem.name === this.userFiltersTabName
    );

    if (savedGridSettingsTab.savedGridSettings.length === 0) {
      savedGridSettingsTab.defaultSetting = { name: this.gridStateKey };
    }

    const fullCustomPreferenceKeyName = this.getCustomPreferenceKey(
      this.gridStateKey,
      preferenceName
    );

    const currentState = cloneDeep(gridState);
    savedGridSettingsTab.savedGridSettings.push({
      name: fullCustomPreferenceKeyName,
      gridState: currentState,
    });

    this.actionPanelState.activeGridSetting = {
      name: fullCustomPreferenceKeyName,
      gridState: currentState,
    };

    this.addNewGridSettingToPreferences(
      savedGridSettingsTab.savedGridSettings,
      fullCustomPreferenceKeyName,
      currentState
    );

    this.menuItemsStateSubject.next(cloneDeep(this.actionPanelState.menuItems));
    this.activeGridSettingSubject.next(this.actionPanelState.activeGridSetting);
  }

  removePreference(preferenceName: string) {
    const items = this.actionPanelState.menuItems.find(
      (menuItem) => (menuItem.name = this.userFiltersTabName)
    );

    items.savedGridSettings = items.savedGridSettings.filter(
      (userSettings) => userSettings.name !== preferenceName
    );

    this.preferenceService.removePreference(preferenceName);
    this.menuItemsStateSubject.next(cloneDeep(this.actionPanelState.menuItems));

    if (
      preferenceName === this.actionPanelState.activeGridSetting.name ||
      items.savedGridSettings.length === 0
    ) {
      this.updateGridSettingsActivePreference(
        items.savedGridSettings,
        this.gridStateKey
      );
      this.setActivePreference(this.gridStateKey);
      return;
    }

    this.updateGridSettingsActivePreference(
      items.savedGridSettings,
      this.actionPanelState.activeGridSetting.name
    );
  }

  async setActivePreference(preferenceName: string) {
    if (preferenceName == this.actionPanelState?.activeGridSetting?.name) {
      return;
    }

    const isDefaultPreferenceSelected = this.gridStateKey === preferenceName;
    const storedGridState = isDefaultPreferenceSelected
      ? {
          name: this.gridStateKey,
          gridState: this.defaultSetting.gridState,
        }
      : this.actionPanelState.menuItems
          .find((menuItem) => menuItem.name === this.userFiltersTabName)
          ?.savedGridSettings.find(
            (menuItem) => menuItem.name == preferenceName
          );

    const savedGridSettingsTab = this.actionPanelState.menuItems.find(
      (menuItem) => menuItem.name === this.userFiltersTabName
    );

    this.updateGridSettingsActivePreference(
      savedGridSettingsTab.savedGridSettings,
      preferenceName
    );

    if (storedGridState.gridState) {
      this.actionPanelState.activeGridSetting = {
        name: preferenceName,
        gridState: storedGridState.gridState,
      };
      this.activeGridSettingSubject.next(
        cloneDeep(this.actionPanelState.activeGridSetting)
      );
      return;
    }

    const selectedGridState = await this.preferenceService
      .getPreference(preferenceName)
      .toPromise();

    if (!selectedGridState && isDefaultPreferenceSelected) {
      this.actionPanelState.activeGridSetting = {
        name: this.gridStateKey,
        gridState: null,
      };
      this.activeGridSettingSubject.next(
        this.actionPanelState.activeGridSetting
      );
      return;
    }

    if (!selectedGridState) {
      return;
    }

    this.actionPanelState.activeGridSetting = {
      name: preferenceName,
      gridState: selectedGridState,
    };

    this.activeGridSettingSubject.next(
      cloneDeep(this.actionPanelState.activeGridSetting)
    );
    if (isDefaultPreferenceSelected) {
      this.defaultSetting.gridState = selectedGridState;
    } else {
      storedGridState.gridState = selectedGridState;
    }
  }

  private createGridSetting(
    preferenceKey: string,
    gridState?: CoreGridState
  ): SavedGridSetting {
    return {
      name: preferenceKey,
      gridState: gridState,
    };
  }

  private getSettingsMapRequest(
    defaultPreferenceKey: string,
    userGridSettings: SavedGridSetting[],
    preferencekey: string
  ): [string, CoreGridPreferenceRequest] {
    return [
      `${defaultPreferenceKey}_SettingsMap`,
      {
        selectedGridSettings: preferencekey,
        saveGridSettings: userGridSettings.map((setting) => setting.name),
      },
    ];
  }

  private addNewGridSettingToPreferences(
    userGridSettings: SavedGridSetting[],
    preferenceKey: string,
    currentState: CoreGridState
  ) {
    const request = this.getSettingsMapRequest(
      this.gridStateKey,
      userGridSettings,
      preferenceKey
    );
    this.preferenceService.setPreference(request[0], request[1]);
    this.preferenceService.setPreference(preferenceKey, currentState);
  }

  private updateGridSettingsActivePreference(
    userGridSettings: SavedGridSetting[],
    preferenceKey: string
  ) {
    const request = this.getSettingsMapRequest(
      this.gridStateKey,
      userGridSettings,
      preferenceKey
    );
    this.preferenceService.setPreference(request[0], request[1]);
  }

  private getCustomPreferenceKey(defaultKey: string, key: string) {
    return `${defaultKey}_${key}`;
  }

  private get isDefaultSettingSelected() {
    if (!this.actionPanelState?.activeGridSetting?.name) {
      return true;
    }
    return (this.actionPanelState.activeGridSetting.name = this.gridStateKey);
  }

  private getMenuItems(
    gridstatekey: string,
    fnOriginal: Function,
    gridApi: CoreGridApi,
    fileName: string,
    processCellCallback: (params: any) => any,
    skipGroups: boolean
  ): CoreMenuItemDef[] {
    const defaultItems = [
      ...this.getDefaultMenuItems(
        gridstatekey,
        gridApi,
        fileName,
        processCellCallback,
        skipGroups
      ),
    ];

    if (!fnOriginal) {
      return defaultItems;
    }

    return [...fnOriginal(), ...defaultItems];
  }

  private getDefaultMenuItems(
    gridStateKey: string,
    gridApi: CoreGridApi,
    fileName: string,
    processCellCallback: (params: any) => any,
    skipGroups: boolean
  ): CoreMenuItemDef[] {
    const commonOptions: CsvExportParams = {
      fileName,
      processCellCallback,
      skipGroups: skipGroups,
    };

    const menuItems: CoreGridSettingsMenuItemDef[] = [
      {
        name: 'clear all Filters',
        menuItemType: MenuItemType.Default,
        action: () => gridApi.setFilterModel(null),
        icon: 'fa-filter',
      },
      {
        name: 'Export all data as csv',
        menuItemType: MenuItemType.Default,
        action: () =>
          gridApi.exportDataAsCsv({ allColumns: true, ...commonOptions }),
        icon: 'fa-file-export',
      },
      {
        name: 'Export visible data as csv',
        menuItemType: MenuItemType.Default,
        action: () =>
          gridApi.exportDataAsCsv({ allColumns: false, ...commonOptions }),
        icon: 'fa-file-export',
      },
    ];

    if (gridStateKey) {
      menuItems.push(
        {
          name: 'Save grid settings',
          menuItemType: MenuItemType.Default,
          action: () => {
            this.saveGridState(gridApi.getGridState());
          },
          icon: 'fa-save',
          showActiveGridSettingName: true,
        },
        {
          name: 'Reset grid settings',
          menuItemType: MenuItemType.Default,
          action: () => {
            gridApi.resetGridState();
            this.resetGridState(gridApi.getGridState());
          },
          icon: 'fa-refresh',
          showActiveGridSettingName: true,
        },
        {
          name: this.userFiltersTabName,
          menuItemType: MenuItemType.GridSettings,
          icon: 'fa-bars',
          savedGridSettings: [],
        },
        {
          name: 'Create new settings',
          menuItemType: MenuItemType.GridSettingInput,
          icon: 'fa-plus-circle',
        }
      );
    }

    if (gridApi.getSelectedRows().length > 0) {
      menuItems.push({
        name: 'Export selected data as csv',
        menuItemType: MenuItemType.Default,
        action: () =>
          gridApi.exportDataAsCsv({ onlySelected: true, ...commonOptions }),
        icon: 'fa-file-export',
      });
    }
    return menuItems;
  }
}
