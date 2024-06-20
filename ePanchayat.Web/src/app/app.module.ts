import './window-object-overrides';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { LocalStorageModule } from 'angular-2-local-storage';
import { HotkeyModule } from 'angular2-hotkeys';
import { BlockUIModule } from 'ng-block-ui';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { SortablejsModule } from 'ngx-sortablejs';
import { AgGridModule } from 'ag-grid-angular';
import { NotifierModule } from 'angular-notifier';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import {
  CorePipesModule,
  CoreDirectivesModule,
  CoreFormModule,
} from '@core/components';
import {
  NavigationDataModule,
  WebApiHandlerServiceModule,
  GlobalErrorHandlerModule,
  DateInternationalizationModule,
  LocaleModule,
  UserPreferencesDataServiceModule,
} from '@core/services';

import { HttpInterceptorModule } from 'src/http-interceptor';
import { CoreRoutesModule } from 'src/routes';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar.component';
import { BlockUiTemplateComponent } from './block-ui-template.component';
import { TreeModule } from 'angular-tree-component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PopoverModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }),
    LocalStorageModule.forRoot({ prefix: 'core' }),
    HotkeyModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    BlockUIModule.forRoot({ template: BlockUiTemplateComponent }),
    TabsModule.forRoot(),
    AgGridModule,
    SortablejsModule.forRoot({ animation: 150 }),
    NgxPageScrollCoreModule.forRoot(),
    TreeModule.forRoot(),
    NotifierModule.withConfig({
      behaviour: {
        autoHide: 3000000,
      },
      position: {
        horizontal: {
          position: 'right',
          distance: 20,
        },
        vertical: {
          position: 'bottom',
          distance: 20,
          gap: 0,
        },
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease-in-out',
        },
        hide: {
          preset: 'slide',
          speed: 200,
          easing: 'ease-in-out',
        },
      },
    }),

    LoadingBarHttpClientModule,
    BrowserAnimationsModule,
    CoreRoutesModule,
    CoreDirectivesModule,
    HttpInterceptorModule,
    GlobalErrorHandlerModule,

    // core common services
    WebApiHandlerServiceModule.forRoot('ePnachayatCoreHttp'),
    DateInternationalizationModule.forRoot(),
    LocaleModule.forRoot(),
    UserPreferencesDataServiceModule.forRoot(),
    GlobalErrorHandlerModule.forRoot(),
    NavigationDataModule.forRoot(),

    // core common components modules
    CorePipesModule.forRoot(),
    CoreFormModule,
  ],
  declarations: [AppComponent, NavBarComponent, BlockUiTemplateComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
