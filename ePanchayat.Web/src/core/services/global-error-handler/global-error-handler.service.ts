import { Injectable, ErrorHandler } from '@angular/core';

import { ErrorInfo } from './model';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  private errors: ErrorInfo[];
  constructor() {}

  handleError(error: any): void {
    console.error(error);
    this.saveError(error);
  }

  getErrors(): ErrorInfo[] {
    return this.errors;
  }

  private saveError(error: any) {
    if (!this.errors) {
      this.errors = [];
    }
    if (this.errors.length > 24) {
      this.errors.shift();
    }
    const errorInfo: ErrorInfo = {
      message: error.message ? error.message : error.toString(),
      name: error.name,
      stack: error.stack,
      timestamp: new Date(),
    };
    this.errors.push(errorInfo);
  }
}
