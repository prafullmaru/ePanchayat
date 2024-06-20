import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import {
  ModuleContainerComponent,
  ModuleContainerModule,
  ModuleHomeComponent,
} from 'src/module-container';

import { HomeRouteGuard } from './home-route.guard';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(galleryRoutes), ModuleContainerModule],
})
export class GalleryRoutesModule {}
