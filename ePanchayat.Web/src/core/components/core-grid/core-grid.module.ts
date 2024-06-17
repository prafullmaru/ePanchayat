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

import { CorePipesModule } from '../pipes/core-pipes.module';
import { CoreDirectivesModule } from '../directives/core-directives.module';

import { ActionLinkCellRenderer } from './action-link.renderer';
import { CoreGridComponent } from './core-grid.component';
import { GridUtilityService } from './grid-utility.service';

const gridArtifacts = [ActionLinkCellRenderer];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgGridModule,
    TabsModule,
    ProgressbarModule,
    CorePipesModule,
    CoreDirectivesModule,
    BsDatepickerModule,
    TypeaheadModule,
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  declarations: [CoreGridComponent, ...gridArtifacts],
  exports: [CoreGridComponent],
  providers: [GridUtilityService],
})
export class CoreGridModule {}
