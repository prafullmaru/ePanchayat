import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CoreFieldComponent } from './core-field.component';
import { CoreFormComponent } from './core-form.component';
import { CalendarFieldInspectorDirective } from './calendar-field-inspector-directive';
import { SelectorInputBaseComponent } from './selector-input-base.component';
import { CoreCalendarComponent } from './core-calendar.component';
import { CoreCalendarDateRangeComponent } from './core-calendar-daterange.component';
import { CoreCheckboxComponent } from './core-checkbox.component';
import { CoreDropdownComponent } from './core-dropdown.component';
import { CoreRadioButtonComponent } from './core-radio-button.component';
import { NgxMaskModule } from 'ngx-mask';

const components = [
  CoreFieldComponent,
  CoreFormComponent,
  CalendarFieldInspectorDirective,
  SelectorInputBaseComponent,
  CoreCalendarComponent,
  CoreCalendarDateRangeComponent,
  CoreCheckboxComponent,
  CoreRadioButtonComponent,
  CoreDropdownComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    BsDatepickerModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: components,
  exports: components,
})
export class CoreFormModule {}
