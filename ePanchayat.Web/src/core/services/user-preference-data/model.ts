export interface UserPreferences {
  [name: string]: any;
}

export interface UserPreferenceDetail {
  PreferenceKey: string;
  PreferenceValue: string;
  IsPublic?: boolean;
}

export enum AppThemes {
  Dark = 'dark',
  Light = 'light',
}
