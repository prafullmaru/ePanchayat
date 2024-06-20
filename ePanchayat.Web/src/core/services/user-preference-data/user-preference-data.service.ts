import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { Observable, tap, of } from '../rxjs-exports';
import { UserPreferences, UserPreferenceDetail } from './model';
import { WebApiHandlerService } from '../web-api-handler/index';

@Injectable()
export class UserPreferencesDataService {
  private readonly storageName = 'consolidatedPreferences';
  private preferences: UserPreferences = {};

  constructor(
    private localStorage: LocalStorageService,
    private webapiHanlder: WebApiHandlerService
  ) {}

  // todo.. add support for multiple prefernces Get/Set from Server side
  async setPreference(key: string, value: any) {
    const url = 'app-settings/user-preferences';
    // Cannot use falsy value check here. Can't set any preference to false if falsy value check is used
    if (typeof value !== 'undefined' && value != null) {
      value = JSON.stringify(value);
    }

    await this.webapiHanlder
      .post(
        url,
        {
          PreferenceKey: key,
          PreferenceValue: value,
        } as UserPreferenceDetail,
        { isSilent: true }
      )
      .pipe(
        tap(() =>
          this.webapiHanlder.removeCache(`app-settings/user-preferences/${key}`)
        )
      )
      .toPromise();
  }

  getPreference(key: string): Observable<any> {
    console.log(key);
    return of(['false']);
    // const url = `app-settings/user-preferences/${key}`;
    // return this.webapiHanlder.get<string>(url, { isSilent: true, cache: true }).pipe(
    //     map((data: string) => {
    //         if (data) {
    //             return JSON.parse(data);
    //         }
    //         return this.getLocalStorageValues(key);
    //     }),
    //     catchError(() => of(this.getLocalStorageValues(key)))
    // );
  }

  removePreference(key: string) {
    console.log(key);
    return of([]);
    //this.setPreference(key, null);
  }

  get(key: string): any {
    this.preferences = this.localStorage.get(this.storageName) || {};
    return this.preferences[key];
  }
}
