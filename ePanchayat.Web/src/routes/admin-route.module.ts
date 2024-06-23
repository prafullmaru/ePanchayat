import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  VehicleModule,
  VehicleComponent
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
        path: 'vehicles',
        component: VehicleComponent,
        data: { description: 'Vehicle' },
      }
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes),
    ModuleContainerModule,
    VehicleModule
  ],
})
export class AdminRoutesModule {}
