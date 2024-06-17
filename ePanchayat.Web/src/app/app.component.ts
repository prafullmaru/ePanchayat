import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';

import { NavigationDataService, TopMenu, sortBy } from '@core/services';

import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit, OnDestroy {
  topMenus: TopMenu[];
  env: string;
  panchayat: string = 'Wagholi';
  loaded = false;
  activeRouteTitle: string;
  activeChildRoute: string;
  activeParentRoute: string;

  private isRouteChangedOnce = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private bsModalService: BsModalService,
    private navigationDataService: NavigationDataService,
    private titleService: Title,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    document.body.classList.add('core-light-theme');

    this.subscriptions.push(
      this.router.events.subscribe((event) => this.onRouteChange(event))
    );

    await this.loadMenuItems();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  private async loadMenuItems() {
    const menus = await this.navigationDataService.getMenus().toPromise();
    this.loaded = true;
    this.topMenus = sortBy(menus, ['SortOrder']);

    if (
      this.topMenus?.every((menu) =>
        menu.SubMenus?.every((subMenu) => subMenu?.IsDisabled)
      )
    ) {
      const noAccessMessage = 'No Access';
      console.log(noAccessMessage);
    }
  }

  private onRouteChange(event) {
    if (event instanceof NavigationEnd) {
      this.onNavigateEnd();
    }

    const shouldProceed =
      event instanceof NavigationStart && this.isRouteChangedOnce;
    this.isRouteChangedOnce = true;

    if (!shouldProceed) {
      return;
    }

    // bsModalService do not have official API to close all modals, so hacking a bit
    (this.bsModalService as any).loaders.forEach((loader) =>
      loader.instance.hide()
    );
  }

  private onNavigateEnd() {
    this.activeParentRoute =
      this.activatedRoute.children[0].snapshot.routeConfig.path;
    const snapshot = this.getChildSnapshot(this.activatedRoute.children[0]);
    this.activeRouteTitle =
      (snapshot.data.description ? snapshot.data.description : 'ePanchayat') +
      ' - ' +
      this.panchayat;
    this.activeChildRoute =
      snapshot.url && snapshot.url.length ? snapshot.url[0].path : '';
    this.titleService.setTitle(this.activeRouteTitle);
  }

  private getChildSnapshot(currentNode: ActivatedRoute) {
    if (
      currentNode.children &&
      currentNode.children.length > 0 &&
      currentNode.children[0].snapshot?.data?.description
    ) {
      return this.getChildSnapshot(currentNode.children[0]);
    } else {
      return currentNode.snapshot;
    }
  }
}
