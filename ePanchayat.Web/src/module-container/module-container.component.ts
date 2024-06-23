import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  NavigationDataService,
  SubMenu,
  TopMenu,
  sortBy,
} from '@core/services';
import {
  mainBlockUiInstanceName,
  BlockUiStateService,
  BlockUiState,
} from 'src/http-interceptor';

import { routeStateAnimation } from './route-state.animation';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { MenuDirection } from './model';

@Component({
  selector: 'module-container',
  templateUrl: 'module-container.component.html',
  styleUrls: ['module-container.component.scss'],
  animations: [routeStateAnimation],
})
export class ModuleContainerComponent implements OnInit {
  subMenus: SubMenu[] = [];
  selectedModuleld: string;
  menuDirection: string;
  isMenuCollapsed = false;
  isMenuHidden = false;
  blockUiInstanceName = mainBlockUiInstanceName;
  activeChildMenulocation: string;

  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private navigationDataService: NavigationDataService,
    private blockUiStateService: BlockUiStateService
  ) {}

  async ngOnInit() {
    this.selectedModuleld =
      this.router.routerState.root.children[0]?.children[0]?.snapshot?.data[
        'Location'
      ];
    this.blockUiStateService
      .getState()
      .subscribe((state) => this.onBlockUiStateChange(state));

    this.router.events.subscribe((event) => this.onRouterEvent(event));
    await this.loadMenus();

    this.tagMenuDirectionToBody();
    this.setMenuBarVisibility();
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  navigateTo(location) {
    this.router.navigate([`/${location}`], {
      queryParamsHandling: 'merge',
    });
  }

  // routerLinkActiveOptions dont support exact: true when we have query params and hence we need this method
  // https://github.com/angular/angular/issues/13205
  isMenuActive(location) {
    let url = this.router.url;
    // take only 2 levels route for calculation
    const splitArray = url.split('/');
    if (splitArray.length > 3) {
      url = `/${splitArray[1]}/${splitArray[2]}`;
    }

    const queryParamsIndex = url.indexOf('?');
    const baseUrl =
      queryParamsIndex === -1 ? url : url.slice(0, queryParamsIndex);
    return baseUrl === `/${location}`;
  }

  private async loadMenus() {
    const topMenuItems: TopMenu[] = await this.navigationDataService
      .getMenus()
      .toPromise();

    const topMenu = topMenuItems.find(
      (menuItem) => menuItem.Location === this.selectedModuleld
    );
    this.calculateMenuDirection(topMenu);
    this.calculateNavItems(topMenu);
  }

  private calculateMenuDirection(topMenu: TopMenu) {
    this.menuDirection = topMenu && topMenu.Direction;
  }

  private calculateNavItems(topMenu: TopMenu) {
    if (!topMenu || !this.selectedModuleld) {
      return;
    }

    const subMenus = sortBy(
      topMenu.SubMenus.filter(
        (subMenu) => !subMenu.IsDisabled && subMenu.SortOrder !== -1
      ),
      ['SortOrder']
    );
    this.subMenus = [
      {
        SubMenuId: -1,
        TopMenuId: -1,
        ObjectTypeName: '',
        SortOrder: -1,
        Description: 'Home',
        Location: topMenu.Location,
        Icon: 'fa-solid fa-house',
        IsDisabled: false,
      },
      ...subMenus,
    ];
  }

  private onRouterEvent(event) {
    if (event instanceof NavigationEnd) {
      this.setMenuBarVisibility();
    }
  }

  private onBlockUiStateChange(state: BlockUiState) {
    if (state.isActive) {
      this.blockUI.start();
    } else {
      this.blockUI.reset();
    }
  }

  private tagMenuDirectionToBody() {
    const body = window.document.body;
    const prefix = 'menu-direction-';
    body.classList.remove(
      prefix + MenuDirection.Horizontal,
      prefix + MenuDirection.Vertical
    );

    body.classList.add(prefix + this.menuDirection);
  }

  private setMenuBarVisibility() {
    this.isMenuHidden =
      this.activatedRoute.snapshot.queryParamMap.get('hide-menu') === 'true';
  }
}
