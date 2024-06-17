import _ from 'lodash';

export function sortBy(collection: any[], fields: string[] | string) {
  return _.sortBy(collection, fields);
}

export function sortByOrder(
  collection: any[],
  fields: string[] | string,
  order: any,
) {
  return (_ as any).orderBy(collection, fields, order);
}
