import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { CoreFormModule, CoreGridModule } from '@core/components';

import { VehicleComponent } from './vehicle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    TabsModule,
    CoreFormModule,
    CoreGridModule,
  ],
  declarations: [VehicleComponent],
})
export class VehicleModule {}
