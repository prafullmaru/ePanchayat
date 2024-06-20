import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { DashboardComponent } from './dashboard.component';
import { DashbaordCarouselComponent } from './dashbaord-carousel.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CarouselModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
  declarations: [DashboardComponent, DashbaordCarouselComponent],
  exports: [DashboardComponent],
})
export class DashboardModule {}
