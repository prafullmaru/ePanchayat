import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  VehicleModule,
  VehicleComponent,
  EmployeeModule,
  EmployeeComponent,
  HouseModule,
  HouseComponent
} from '@features/admin';

import {
  ModuleContainerComponent,
  ModuleContainerModule,
  ModuleHomeComponent,
} from 'src/module-container';

import { HomeRouteGuard } from './home-route.guard';

const adminRoutes: Route[] = [
  {
    path: '',
    component: ModuleContainerComponent,
    data: {
      description: 'Admin',
      Location: 'admin',
    },
    children: [
      {
        path: '',
        component: ModuleHomeComponent,
        canActivate: [HomeRouteGuard],
      },
      {
        path: 'house',
        component: HouseComponent,
        data: { description: 'House' },
      },
      {
        path: 'vehicles',
        component: VehicleComponent,
        data: { description: 'Vehicle' },
      }
      {
        path: 'employees',
        component: EmployeeComponent,
        data: { description: 'Employees' },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes),
    ModuleContainerModule,
    VehicleModule,
    EmployeeModule,
    HouseModule
  ],
})
export class AdminRoutesModule {}
