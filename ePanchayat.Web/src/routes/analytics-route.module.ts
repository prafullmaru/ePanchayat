import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  ModuleContainerComponent,
  ModuleContainerModule,
  ModuleHomeComponent,
} from 'src/module-container';

import { HomeRouteGuard } from './home-route.guard';
import { WipModule, WipComponent } from '../wip/index';

const analyticsRoutes: Route[] = [
  {
    path: '',
    component: ModuleContainerComponent,
    data: {
      description: 'Analytics',
      Location: 'analytics',
    },
    children: [
      {
        path: '',
        component: ModuleHomeComponent,
        canActivate: [HomeRouteGuard],
      },
      {
        path: 'by-gender',
        component: WipComponent,
        data: { description: 'By Gender' },
      },
      {
        path: 'by-qualifications',
        component: WipComponent,
        data: { description: 'By Qualifications' },
      },
      {
        path: 'by-vehicles',
        component: WipComponent,
        data: { description: 'By Vehicles' },
      },
      {
        path: 'by-tax-collection',
        component: WipComponent,
        data: { description: 'By Tax Collection' },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(analyticsRoutes),
    ModuleContainerModule,
    WipModule,
  ],
})
export class AnalyticsRoutesModule {}
