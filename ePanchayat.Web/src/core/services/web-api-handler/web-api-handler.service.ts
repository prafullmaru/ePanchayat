import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Observable,
  throwError,
  publishReplay,
  refCount,
  catchError,
  Observer,
  map,
  tap,
  of,
} from '../rxjs-exports';

import { areEqual, clone } from '../utility-functions/index';

import {
  ApiHandlerOptions,
  CacheItem,
  methodType,
  ApiSubscription,
  ApiError,
} from './model';

@Injectable()
export class WebApiHandlerService {
  private apiErrors: ApiError[] = [];
  private cacheItems: CacheItem[] = [];
  private apiSubscriptions: ApiSubscription[] = [];

  private baseUrl = 'http://localhost:8081/#/';

  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: ApiHandlerOptions): Observable<T> {
    options = options || {};

    const fullurl = this.getEndpoint(url);

    if (!options.cache) {
      return this.executeRequest(methodType.get, fullurl, options);
    }

    const index = this.getCacheItemIndex(this.cacheItems, url, options.params);
    const cacheItem = index > -1 ? this.cacheItems[index] : null;

    if (
      cacheItem &&
      !this.isCacheExpired(
        cacheItem.absoluteExpiration,
        cacheItem.lastFetchedTime
      )
    ) {
      return cacheItem.result.pipe(map((result) => clone(result)));
    }

    const fnServerCall = this.executeRequest(
      methodType.get,
      fullurl,
      options
    ).pipe(
      publishReplay(1),
      refCount(),
      map((result) => clone(result)),
      tap(() => this.resetLastFetchedTime(url, options.params))
    );

    this.cacheItems.push({
      url,
      params: options.params,
      result: fnServerCall,
      absoluteExpiration: options.absoluteExpiration,
    });
    return fnServerCall;
  }

  setCacheItems(result: any, url: string, options?: ApiHandlerOptions) {
    const index = this.getCacheItemIndex(this.cacheItems, url, options.params);
    const cacheItem = index > -1 ? this.cacheItems[index] : null;
    if (
      cacheItem &&
      !this.isCacheExpired(
        cacheItem.absoluteExpiration,
        cacheItem.lastFetchedTime
      )
    ) {
      cacheItem.result = of(result);
    }
  }

  getCacheItems(url: string) {
    const index = this.cacheItems.findIndex((item) => areEqual(item.url, url));
    const cacheItem = index > -1 ? this.cacheItems[index] : null;
    if (
      cacheItem &&
      !this.isCacheExpired(
        cacheItem.absoluteExpiration,
        cacheItem.lastFetchedTime
      )
    ) {
      return cacheItem.result;
    }
  }

  post<T>(url: string, data: T, options?: ApiHandlerOptions): Observable<any> {
    const finalUrl = this.getEndpoint(url);
    return this.executeRequest(methodType.post, finalUrl, options, data);
  }

  put<T>(url: string, data: T, options?: ApiHandlerOptions): Observable<any> {
    const finalUrl = this.getEndpoint(url);
    return this.executeRequest(methodType.put, finalUrl, options, data);
  }

  delete<T>(
    url: string,
    data: T,
    options?: ApiHandlerOptions
  ): Observable<any> {
    const finalUrl = this.getEndpoint(url);
    return this.executeRequest(methodType.delete, finalUrl, options, data);
  }

  removeCache(url: string, params?: any) {
    // if a url cache is being cleared without any paramaters, we also need to clear caches stored using
    // because it will become stale otherwise
    if (!params) {
      this.cacheItems = this.cacheItems.filter(
        (cacheItem) => !areEqual(cacheItem.url, url)
      );
      return;
    }

    const index = this.getCacheItemIndex(this.cacheItems, url, params);
    if (index > -1) {
      this.cacheItems.splice(index, 1);
    }
  }

  removeAllCache() {
    this.cacheItems = [];
  }

  cancelAllRequests() {
    for (const apiSubscription of this.apiSubscriptions) {
      if (apiSubscription.subscription.closed) {
        continue;
      }

      apiSubscription.subscription.unsubscribe();
      const url = this.stripEndpointFromUrl(apiSubscription.url);
      this.removeCache(url, apiSubscription.params);
    }
  }

  getApiErrors(): ApiError[] {
    return this.apiErrors;
  }

  getEndpoint(
    url: string
    // options: ApiHandlerOptions
  ): string {
    // if input is already a resolved url, we dont need to resolve it further
    if (url.includes('http://') || url.includes('https://')) {
      return url;
    }

    return `${this.baseUrl}${url}`;
  }

  private executeRequest(
    type: string,
    url: string,
    options?: ApiHandlerOptions,
    data?: any
  ) {
    let headers = new HttpHeaders();
    if (options?.isSilent) {
      headers = headers.set('isSilent', 'true');
    }

    if (options?.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
        headers = headers.set(key, value);
      }
    }

    return Observable.create((observer: Observer<any>) => {
      const subscription = this.http
        .request(type, url, {
          body: data,
          ...options,
          headers,
        })
        .pipe(catchError((response) => this.handleError(response)))
        .subscribe(
          (result) => observer.next(result),
          (error) => observer.error(error),
          () => observer.complete()
        );

      this.apiSubscriptions.push({
        url,
        params: options && options.params,
        subscription,
      });
    });
  }

  private handleError(response): Observable<ApiError> {
    const unknownErrorMessage = `There seems to be an issue with your smart card certificate.
        Please lock and unlock your system and then launch Core UI in a new browser window.
        Please contact support if problem persists';`;

    const message =
      (response.status === 0 &&
        response.statusText == 'Unknown Error' &&
        unknownErrorMessage) ||
      (response.error && response.error.DetailedInformation) ||
      (response.error && response.error.message) ||
      response.error & response.error.Message ||
      (typeof response.error === 'string' && response.error) ||
      (response.error instanceof ArrayBuffer &&
        String.fromCharCode.apply(null, new Int8Array(response.error))) ||
      (typeof response.error === 'object' &&
        typeof response.error.error === 'object' &&
        response.error.error.message &&
        typeof response.error.error.message === 'string' &&
        response.error.error.message) ||
      'System Error occurred.';

    const error: ApiError = {
      status: response.status,
      message,
      timestamp: new Date(),
    };

    if (this.apiErrors.length > 50) {
      this.apiErrors.shift();
    }
    this.apiErrors.unshift(error);
    return throwError(error);
  }

  private resetLastFetchedTime(url: string, params: any) {
    const cacheItem = this.getCacheItem(this.cacheItems, url, params);
    cacheItem.lastFetchedTime = new Date();
  }

  private getCacheItemIndex(
    cacheItems: CacheItem[],
    url: string,
    params
  ): number {
    return cacheItems.findIndex(
      (cacheItem) =>
        areEqual(cacheItem.url, url) && areEqual(cacheItem.params, params)
    );
  }

  private getCacheItem(
    cacheItems: CacheItem[],
    url: string,
    params
  ): CacheItem {
    return cacheItems.find(
      (cacheItem) =>
        areEqual(cacheItem.url, url) && areEqual(cacheItem.params, params)
    );
  }

  private stripEndpointFromUrl(fullurl: string): string {
    const portPrefix = fullurl.lastIndexOf(':');
    return fullurl.substr(portPrefix + 6, fullurl.length - 1);
  }

  private isCacheExpired(expiration: number, lastFetchedTime: Date): boolean {
    if (typeof expiration === 'undefined') {
      return false;
    }

    const expirationTime = new Date(lastFetchedTime);
    expirationTime.setMinutes(expirationTime.getMinutes() + expiration);
    return new Date() > expirationTime;
  }
}
