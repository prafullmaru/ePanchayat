import _ from 'lodash';

export function mergeBykey<T>(object1: T[], object2: T[], key: string): any[] {
  return _.values(_.merge(_.keyBy(object1, key), _.keyBy(object2, key)));
}
