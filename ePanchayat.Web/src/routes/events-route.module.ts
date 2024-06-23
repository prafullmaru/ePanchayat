import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  ModuleContainerComponent,
  ModuleContainerModule,
  ModuleHomeComponent,
} from 'src/module-container';

import { HomeRouteGuard } from './home-route.guard';
import { WipModule, WipComponent } from '../wip/index';

const eventsRoutes: Route[] = [
  {
    path: '',
    component: ModuleContainerComponent,
    data: {
      description: 'Events',
      Location: 'events',
    },
    children: [
      {
        path: '',
        component: ModuleHomeComponent,
        canActivate: [HomeRouteGuard],
      },
      {
        path: 'events',
        component: WipComponent,
        data: { description: 'Events' },
      },
      {
        path: 'announcements',
        component: WipComponent,
        data: { description: 'Announcements' },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(eventsRoutes),
    ModuleContainerModule,
    WipModule,
  ],
})
export class EventsRoutesModule {}
