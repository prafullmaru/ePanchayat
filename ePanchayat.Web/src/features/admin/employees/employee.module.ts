import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CoreFormModule, CoreGridModule } from '@core/components';

import { EmployeeComponent } from './employee.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule,
    CoreFormModule,
    CoreGridModule,
  ],
  declarations: [EmployeeComponent],
})
export class EmployeeModule {}
