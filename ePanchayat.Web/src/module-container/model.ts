import { NavItem } from '@core/services';

export interface MainMenuItem {
  moduleId?: string;
  moduleName?: string;
  direction?: MenuDirection;
  icon?: string;
  description?: string;
}

export enum MenuDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum TopNavigation {
  Show = 'show',
  Hide = 'hide',
}

export interface SubMenuItem extends NavItem {
  moduleId?: string;
  isActive?: boolean;
  isLoaded?: boolean;
  icon?: string;
  isDisabled?: boolean;
}
