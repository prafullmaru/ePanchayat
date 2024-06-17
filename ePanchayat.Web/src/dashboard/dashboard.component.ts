import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NavigationDataService, TopMenu } from '@core/services';

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  topMenus: TopMenu[] = [];

  constructor(
    private router: Router,
    private navigationDataService: NavigationDataService
  ) {}

  async ngOnInit() {
    this.topMenus = await this.navigationDataService.getMenus().toPromise();
  }

  onCardClick(url: string) {
    this.router.navigateByUrl(url);
  }
}
