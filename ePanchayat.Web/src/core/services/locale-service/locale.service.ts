import { Injectable } from '@angular/core';
import moment from 'moment-timezone';

import { BehaviorSubject, Observable } from '../rxjs-exports';
import { UserPreferencesDataService } from '../user-preference-data/index';
import { areEqual } from '../utility-functions/index';
import { AltFormatType, FormatType, LocaleInfo, LocaleType } from './model';

@Injectable()
export class LocaleService {
  private allLocales: LocaleInfo[] = [
    {
      localeName: LocaleType.US,
      format: FormatType.USFormat,
      altFormat: AltFormatType.USAltFormat,
    },
    {
      localeName: LocaleType.UK,
      format: FormatType.UKFormat,
      altFormat: AltFormatType.UKAltFormat,
    },
  ];

  private storageKey = 'locale';
  private localeSubject$: BehaviorSubject<LocaleInfo> =
    new BehaviorSubject<LocaleInfo>({});

  constructor(private userPreferenceService: UserPreferencesDataService) {}

  get AppLocale$(): Observable<LocaleInfo> {
    return this.localeSubject$.asObservable();
  }

  getLocales(): LocaleInfo[] {
    return this.allLocales;
  }

  setPreferredLocale(localeName: LocaleType) {
    const locale = this.allLocales.find(
      (currentLocale) => (currentLocale.localeName = localeName),
    );
    this.localeSubject$.next(locale);
    // this.userPreferenceService.setPreference(this.storageKey, locale);
  }

  async loadLocale() {
    this.initializeLocalewithBrowserTimeZone();
    const appLocale = await this.userPreferenceService
      .getPreference(this.storageKey)
      .toPromise();

    const currentLocale = this.localeSubject$.getValue();
    if (appLocale && !areEqual(appLocale, currentLocale)) {
      this.localeSubject$.next(appLocale);
    }
  }

  toggleDateFormat() {
    const locale = this.localeSubject$.getValue().localeName;
    const appLocaleName =
      locale === LocaleType.US ? LocaleType.UK : LocaleType.US;
    this.setPreferredLocale(appLocaleName);
  }

  getLocaleFormatForDisplay(): string {
    // const format = this.localeSubject$.value.format?.toLocaleLowerCase();
    const format = FormatType.UKFormat;
    return format
      .replace('m/d/yyyy', 'mm/dd/yyyy')
      .replace('d/m/yyyy', 'dd/mm/yyyy');
  }

  getLocaleFormat(): string {
    const format = FormatType.UKFormat;
    return format;
    // return this.localeSubject$.value.format;
  }

  parseDate(date: string) {
    const dateFormat = this.getLocaleFormatForDisplay()
      .toUpperCase()
      .replace('/', '-');
    return moment(date, [dateFormat]).toDate();
  }

  private initializeLocalewithBrowserTimeZone() {
    const offset = new Date().getTimezoneOffset();
    const localeType =
      offset === 0 || offset === 60 ? LocaleType.UK : LocaleType.US;
    const locale = this.allLocales.find(
      (currentLocale) => currentLocale.localeName === localeType,
    );

    this.localeSubject$.next(locale);
  }
}
