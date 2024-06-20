export enum LocaleType {
  US = 'en-US',
  UK = 'en-UK',
}
export enum FormatType {
  USFormat = 'M/d/yyyy',
  UKFormat = 'd/M/yyyy',
}

export enum AltFormatType {
  USAltFormat = 'M!/d!/yyyy',
  UKAltFormat = 'd!/M!/yyyy',
}

export interface LocaleInfo {
  localeName?: LocaleType;
  format?: FormatType;
  altFormat?: AltFormatType;
}
