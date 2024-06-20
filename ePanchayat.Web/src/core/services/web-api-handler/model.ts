import { HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from '../rxjs-exports';

export enum EndpointType {
  Rest,
  WebSocket,
  Watson,
}

export interface CacheItem {
  url?: string;
  params?: any;
  result?: Observable<any>;
  lastFetchedTime?: Date;
  absoluteExpiration?: number;
}

export interface ApiSubscription {
  url?: string;
  params?: object;
  subscription: Subscription;
}

export interface ApiHandlerOptions {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?: any;
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'text';
  withCredentials?: boolean;

  // custom ones
  endpointType?: EndpointType;
  isSilent?: boolean;
  cache?: boolean;
  serviceName?: string;
  environmentName?: string;
  absoluteExpiration?: number;
}

export const methodType = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete',
};

export interface ApiError {
  message?: string;
  status?: string;
  timestamp?: Date;
}
