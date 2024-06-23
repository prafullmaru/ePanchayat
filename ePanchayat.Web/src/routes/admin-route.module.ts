import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  VehicleModule,
  VehicleComponent,
  EModule,
  EComponent,
  HouseModule,
  HouseComponent,
} from '@features/admin';

import {
  ModuleContainerComponent,
  ModuleContainerModule,
  ModuleHomeComponent,
} from 'src/module-container';

import { HomeRouteGuard } from './home-route.guard';
import { WipModule, WipComponent } from '../wip/index';

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
        path: 'vehicles',
        component: VehicleComponent,
        data: { description: 'Vehicle' },
      },
      {
        path: 'panchayat',
        component: WipComponent,
        data: { description: 'Panchayat' },
      },
      {
        path: 'employees',
        component: EComponent,
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
    EModule,
    HouseModule,
  ],
})
export class AdminRoutesModule {}
