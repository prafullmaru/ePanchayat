import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  ModuleContainerComponent,
  ModuleContainerModule,
  ModuleHomeComponent,
} from 'src/module-container';

import { HomeRouteGuard } from './home-route.guard';
import { WipModule, WipComponent } from '../wip/index';

const financeRoutes: Route[] = [
  {
    path: '',
    component: ModuleContainerComponent,
    data: {
      description: 'Finance',
      Location: 'finance',
    },
    children: [
      {
        path: '',
        component: ModuleHomeComponent,
        canActivate: [HomeRouteGuard],
      },
      {
        path: 'ledger',
        component: WipComponent,
        data: { description: 'Ledger' },
      },
      {
        path: 'tax-collection',
        component: WipComponent,
        data: { description: 'Tax Collection' },
      },
      {
        path: 'balance-sheet',
        component: WipComponent,
        data: { description: 'Balance Sheet' },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(financeRoutes),
    ModuleContainerModule,
    WipModule,
  ],
})
export class FinanceRoutesModule {}
