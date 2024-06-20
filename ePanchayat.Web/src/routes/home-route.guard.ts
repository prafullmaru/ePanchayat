import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  NavigationEnd,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HomeRouteGuard implements CanActivate {
  private routeHistory: { [moduleName: string]: string } = {};
  private lastVisitedModuleId: string;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => this.onRouterEvent(event));
  }

  canActivate(activatedRoute: ActivatedRouteSnapshot): boolean {
    const currentModuleId = activatedRoute.data.Location;
    const lastVisitedRoute = this.routeHistory[currentModuleId];

    if (!lastVisitedRoute || currentModuleId === this.lastVisitedModuleId) {
      return true;
    } else {
      this.router.navigateByUrl(`${currentModuleId}/${lastVisitedRoute}`);
      return false;
    }
  }

  private onRouterEvent(event) {
    const shouldProceed = event instanceof NavigationEnd;
    if (!shouldProceed) {
      return;
    }

    const [, moduleId, pageId] = (event as NavigationEnd).url.split('/');
    this.routeHistory[moduleId] = pageId ? pageId : '';

    this.lastVisitedModuleId = moduleId;
  }
}
