import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { DashboardModule, DashboardComponent } from 'src/dashboard';
import { WipModule, WipComponent } from 'src/wip';

import { FeaturePrelaodingStategy } from './feature-preloading-strategy.service';

const routes: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'wip',
    component: WipComponent,
  },
  {
    path: 'finance',
    loadChildren: () =>
      import('./finance-route.module').then(
        (module) => module.FinanceRoutesModule
      ),
    data: { preload: true },
  },
  {
    path: 'complaint',
    loadChildren: () =>
      import('./complaint-route.module').then(
        (module) => module.ComplaintRoutesModule
      ),
    data: { preload: true },
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./events-route.module').then(
        (module) => module.EventsRoutesModule
      ),
    data: { preload: true },
  },
  {
    path: 'gallery',
    loadChildren: () =>
      import('./gallery-route.module').then(
        (module) => module.GalleryRoutesModule
      ),
    data: { preload: true },
  },
  {
    path: 'egovernance',
    loadChildren: () =>
      import('./egovernance-route.module').then(
        (module) => module.EgovernanceRoutesModule
      ),
    data: { preload: true },
  },
  {
    path: 'analytics',
    loadChildren: () =>
      import('./analytics-route.module').then(
        (module) => module.AnalyticsRoutesModule
      ),
    data: { preload: true },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-route.module').then((module) => module.AdminRoutesModule),
    data: { preload: true },
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: FeaturePrelaodingStategy,
      useHash: true,
      onSameUrlNavigation: 'reload',
      relativeLinkResolution: 'legacy',
    }),
  ],
  providers: [FeaturePrelaodingStategy],
  exports: [RouterModule, DashboardModule, WipModule],
})
export class CoreRoutesModule {}
