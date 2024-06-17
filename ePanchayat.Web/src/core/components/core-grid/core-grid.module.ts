import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { LocaleModule, WindowRefModule } from '@core/services';
import { CorePipesModule } from '../pipes/core-pipes.module';
import { CoreDirectivesModule } from '../directives/core-directives.module';
import { CoreFormModule } from '../core-form/core-form.module';

import { ActionLinkCellRenderer } from './action-link.renderer';
import { AmountInputCellEditor } from './amount-input.editor';
import { AmountInputCellRenderer } from './amount-input.renderer';
import { CellWithErrorCellRenderer } from './cell-with-error.renderer';
import { CheckboxCellRenderer } from './checkbox.renderer';
import { CompareDatesService } from './compare-dates.service';
import { CoreGridComponent } from './core-grid.component';
import { FloatingFilterComponent } from './floating-filter.component';
import { GridHeightOffsetDirective } from './grid-height-offset.directive';
import { GridUtilityService } from './grid-utility.service';
import { GridStateStore } from './grid-state.store';
import { HeaderComponent } from './header.component';
import { LoadingOverlayComponent } from './loading-overlay.component';

const gridArtifacts = [
  FloatingFilterComponent,
  ActionLinkCellRenderer,
  CheckboxCellRenderer,
  AmountInputCellRenderer,
  AmountInputCellEditor,
  CellWithErrorCellRenderer,
  LoadingOverlayComponent,
  CellWithErrorCellRenderer,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule,
    TabsModule,
    ProgressbarModule,
    CorePipesModule,
    WindowRefModule,
    LocaleModule,
    CoreDirectivesModule,
    BsDatepickerModule,
    CoreFormModule,
    TypeaheadModule,
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  declarations: [
    CoreGridComponent,
    GridHeightOffsetDirective,
    HeaderComponent,
    ...gridArtifacts,
  ],
  exports: [CoreGridComponent],
  providers: [GridUtilityService, CompareDatesService, GridStateStore],
})
export class CoreGridModule {}
