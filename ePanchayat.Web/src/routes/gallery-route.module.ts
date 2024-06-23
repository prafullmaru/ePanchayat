import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  ModuleContainerComponent,
  ModuleContainerModule,
  ModuleHomeComponent,
} from 'src/module-container';

import { HomeRouteGuard } from './home-route.guard';
import { WipModule, WipComponent } from '../wip/index';

const galleryRoutes: Route[] = [
  {
    path: '',
    component: ModuleContainerComponent,
    data: {
      description: 'Gallery',
      Location: 'gallery',
    },
    children: [
      {
        path: '',
        component: ModuleHomeComponent,
        canActivate: [HomeRouteGuard],
      },
      {
        path: 'all-photos',
        component: WipComponent,
        data: { description: 'All Photos' },
      },
      {
        path: 'all-vidoes',
        component: WipComponent,
        data: { description: 'All Videos' },
      },
      {
        path: 'event-photos',
        component: WipComponent,
        data: { description: 'Event Photos' },
      },
      {
        path: 'event-vidoes',
        component: WipComponent,
        data: { description: 'Event Videos' },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(galleryRoutes),
    ModuleContainerModule,
    WipModule,
  ],
})
export class GalleryRoutesModule {}
