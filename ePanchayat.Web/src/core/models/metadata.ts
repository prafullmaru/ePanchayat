export class MetaData {
  isVisible = true;
  isRequired = false;
  isReadOnly = false;
}

export interface MetaDataInfo {
  [name: string]: MetaData;
}
