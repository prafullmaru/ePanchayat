import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BlockUIModule } from 'ng-block-ui';

import { NavigationDataModule } from '@core/services';
import { ModuleContainerComponent } from './module-container.component';
import { ModuleHomeComponent } from './home.component';

const components = [ModuleContainerComponent, ModuleHomeComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TabsModule,
    BlockUIModule,
    TooltipModule,
    NavigationDataModule,
  ],
  declarations: components,
  exports: components,
})
export class ModuleContainerModule {}
