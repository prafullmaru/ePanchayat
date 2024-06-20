import { DataType } from '@core/models';

export function getColumnDataType(inputName, input): DataType {
  const types = ['string', 'Number', 'Date', 'Boolean'];
  const datePropertiesMap = [
    'Date',
    'Created On',
    'Updated On',
    'Maturity Date',
  ];
  const flatIntNumberPropertiesMap = ['Id'];
  const intNumberPropertiesMap = ['Quantity', 'Position'];
  const floatNumberPropertiesMap = ['price'];

  const dataType: DataType = { Type: 'String' };

  if (flatIntNumberPropertiesMap.find((prop) => inputName.includes(prop))) {
    return dataType;
  }

  if (intNumberPropertiesMap.find((prop) => inputName.includes(prop))) {
    dataType.Type = 'Number';
    dataType.MaxDigit = 0;
    return dataType;
  }

  if (floatNumberPropertiesMap.find((prop) => inputName.includes(prop))) {
    dataType.Type = 'Number';
    dataType.MaxDigit = 3;
    return dataType;
  }

  if (datePropertiesMap.find((prop) => inputName.includes(prop))) {
    dataType.Type = 'Date';
    dataType.IncludeTime = false;
    return dataType;
  }

  if (input) {
    const self = input.constructor.name;
    dataType.Type = types.find((type) => type === self)
      ? types.find((type) => type === self)
      : 'String';
  }
  return dataType;
}
