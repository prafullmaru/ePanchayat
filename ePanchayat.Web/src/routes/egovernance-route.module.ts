import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  ModuleContainerComponent,
  ModuleContainerModule,
  ModuleHomeComponent,
} from 'src/module-container';

import { HomeRouteGuard } from './home-route.guard';

const egovernanceRoutes: Route[] = [
  {
    path: '',
    component: ModuleContainerComponent,
    data: {
      description: 'eGovernance',
      Location: 'egovernance',
    },
    children: [
      {
        path: '',
        component: ModuleHomeComponent,
        canActivate: [HomeRouteGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(egovernanceRoutes), ModuleContainerModule],
})
export class EgovernanceRoutesModule {}
