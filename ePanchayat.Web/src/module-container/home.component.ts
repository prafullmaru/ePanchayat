import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationDataService, SubMenu, sortBy } from '@core/services';

@Component({
  selector: 'module-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class ModuleHomeComponent implements OnInit {
  subMenus: SubMenu[];
  constructor(
    private router: Router,
    private navigationDataService: NavigationDataService
  ) {}

  async ngOnInit() {
    let selectedModuleId =
      this.router.routerState.root.children[0].children[0].snapshot.data[
        'Location'
      ];

    if (!selectedModuleId) {
      selectedModuleId = 'pricing';
    }

    const topMenus = await this.navigationDataService.getMenus().toPromise();

    const topMenu = topMenus.find((menu) => menu.Location === selectedModuleId);
    const menus = topMenu.SubMenus.filter(
      (subMenu) => !subMenu.IsDisabled && subMenu.SortOrder !== 1
    );
    this.subMenus = sortBy(menus, ['SortOrder']);
  }

  onCardClick(url: string) {
    this.router.navigate([`/${url}`], {
      queryParamsHandling: 'merge',
    });
  }
}
