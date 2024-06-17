export enum StatusType {
  Warning,
  Error,
}

export interface StatusInfo {
  Message?: string;
  Type?: StatusType;
}
