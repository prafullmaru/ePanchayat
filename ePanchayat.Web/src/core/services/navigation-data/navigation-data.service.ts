import { Injectable } from '@angular/core';
import { Observable, of } from '../rxjs-exports';
import { TopMenu } from './model';

@Injectable()
export class NavigationDataService {
  constructor() {}

  getMenus(): Observable<TopMenu[]> {
    return of([
      {
        TopMenuId: 1,
        Location: 'finance',
        Name: 'Finance',
        Icon: 'fa-solid fa-indian-rupee-sign',
        Direction: 'horizontal',
        Description:
          'Finance module provides ledger for detailed record of all the transactions and we will have statistics reports around expenditures.',
        SortOrder: -1,
        SubMenus: [],
      },
      {
        TopMenuId: 2,
        Location: 'complaint',
        Name: 'Complaint',
        Icon: 'fa-solid fa-arrow-right-to-bracket',
        Direction: 'horizontal',
        Description:
          'One-stop platform for citizens to seek redressal of their grievances and provide feedback for improvements.',
        SortOrder: 2,
        SubMenus: [],
      },
      {
        TopMenuId: 3,
        Location: 'events',
        Name: 'Events',
        Icon: 'fa-regular fa-calendar-days',
        Direction: 'horizontal',
        Description:
          'Upcoming events and announcements will placed with schedule, purpose and related informations.',
        SortOrder: 3,
        SubMenus: [],
      },
      {
        TopMenuId: 4,
        Location: 'gallery',
        Name: 'Gallery',
        Icon: 'fa-regular fa-images',
        Direction: 'horizontal',
        Description:
          'A gallery with photos and videos to share memorable memory and achievements.',
        SortOrder: 4,
        SubMenus: [],
      },
      {
        TopMenuId: 5,
        Location: 'egovernance',
        Name: 'eGovernance',
        Icon: 'fa-solid fa-globe',
        Direction: 'horizontal',
        Description:
          'E-governance is most cutting-edge efforts to develop effective governance. Provides connectivity to all e-governance aspects.',
        SortOrder: 5,
        SubMenus: [],
      },
      {
        TopMenuId: 6,
        Location: 'analytics',
        Name: 'Analytics',
        Icon: 'fa-regular fa-snowflake',
        Direction: 'horizontal',
        Description:
          'Systematic computational analysis of data or statistics presented as report and graphs.',
        SortOrder: 6,
        SubMenus: [],
      },
      {
        TopMenuId: 7,
        Location: 'admin',
        Name: 'Admin',
        Icon: 'fa-brands fa-redhat',
        Direction: 'vertical',
        Description:
          'Provides feature to onboard new panchayat and users. Offers features to manage - Access, Data, Qualifications, Vehicle details.',
        SortOrder: 7,
        SubMenus: [
          {
            SubMenuId: 1,
            Description: 'Onboarding',
            Icon: 'fa-solid fa-list-check',
            IsDisabled: false,
            Location: 'admin/onboarding',
            ObjectTypeName: 'Test',
            TopMenuId: 7,
            SortOrder: -1,
          },
          {
            SubMenuId: 1,
            Description: 'Role',
            Icon: 'fa-solid fa-user-group',
            IsDisabled: false,
            Location: 'admin/test4',
            ObjectTypeName: 'Test',
            TopMenuId: 7,
            SortOrder: -1,
          },
          {
            SubMenuId: 1,
            Description: 'Role Access',
            Icon: 'fa-solid fa-user-shield',
            IsDisabled: false,
            Location: 'admin/test5',
            ObjectTypeName: 'Test',
            TopMenuId: 7,
            SortOrder: -1,
          },
          {
            SubMenuId: 1,
            Description: 'House',
            Icon: 'fa-regular fa-building',
            IsDisabled: false,
            Location: 'admin/test5',
            ObjectTypeName: 'Test',
            TopMenuId: 7,
            SortOrder: -1,
          },
          {
            SubMenuId: 1,
            Description: 'Asset',
            Icon: 'fa-solid fa-laptop-file',
            IsDisabled: false,
            Location: 'admin/asset',
            ObjectTypeName: 'Test',
            TopMenuId: 7,
            SortOrder: -1,
          },
          {
            SubMenuId: 1,
            Description: 'Locations',
            Icon: 'fa-solid fa-location-dot',
            IsDisabled: false,
            Location: 'admin/locations',
            ObjectTypeName: 'Test',
            TopMenuId: 7,
            SortOrder: -1,
          },
          {
            SubMenuId: 1,
            Description: 'Employees',
            Icon: 'fa-regular fa-address-card',
            IsDisabled: false,
            Location: 'admin/employees',
            ObjectTypeName: 'Test',
            TopMenuId: 7,
            SortOrder: -1,
          },
          {
            SubMenuId: 1,
            Description: 'Qualifications',
            Icon: 'fa-solid fa-graduation-cap',
            IsDisabled: false,
            Location: 'admin/qualifications',
            ObjectTypeName: 'Test',
            TopMenuId: 7,
            SortOrder: -1,
          },
          {
            SubMenuId: 1,
            Description: 'Vehicle',
            Icon: 'fa-solid fa-car-side',
            IsDisabled: false,
            Location: 'admin/vehicle',
            ObjectTypeName: 'Test',
            TopMenuId: 7,
            SortOrder: -1,
          },
        ],
      },
    ]);
  }
}
