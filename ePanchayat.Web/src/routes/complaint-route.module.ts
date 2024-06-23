import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  ModuleContainerComponent,
  ModuleContainerModule,
  ModuleHomeComponent,
} from 'src/module-container';

import { HomeRouteGuard } from './home-route.guard';
import { WipModule, WipComponent } from '../wip/index';

const complaintRoutes: Route[] = [
  {
    path: '',
    component: ModuleContainerComponent,
    data: {
      description: 'Complaint',
      Location: 'complaint',
    },
    children: [
      {
        path: '',
        component: ModuleHomeComponent,
        canActivate: [HomeRouteGuard],
      },
      {
        path: 'status',
        component: WipComponent,
        data: { description: 'Status' },
      },
      {
        path: 'report-new',
        component: WipComponent,
        data: { description: 'Report New' },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(complaintRoutes),
    ModuleContainerModule,
    WipModule,
  ],
})
export class ComplaintRoutesModule {}
