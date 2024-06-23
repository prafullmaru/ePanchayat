import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CoreFormModule, CoreGridModule } from '@core/components';

import { HouseComponent } from './house.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    CoreFormModule,
    CoreGridModule,
  ],
  declarations: [HouseComponent],
})
export class HouseModule {}
