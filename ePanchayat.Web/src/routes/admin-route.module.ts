import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { VehicleModule, VehicleComponent } from '@features/admin';
import { WipModule, WipComponent } from '../wip/index';

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
        path: 'role',
        component: WipComponent,
        data: { description: 'Role' },
      },
      {
        path: 'role-access',
        component: WipComponent,
        data: { description: 'Role Access' },
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
      },
      {
        path: 'users',
        component: WipComponent,
        data: { description: 'User' },
      },
      {
        path: 'qualifications',
        component: WipComponent,
        data: { description: 'Qualification' },
      },
      {
        path: 'panchayat',
        component: WipComponent,
        data: { description: 'Panchayat' },
      },
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
    WipModule,
    VehicleModule,
	EmployeeModule,
	HouseModule
  ],
})
export class AdminRoutesModule {}
