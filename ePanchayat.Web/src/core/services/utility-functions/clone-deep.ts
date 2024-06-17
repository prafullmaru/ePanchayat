import _ from 'lodash';

export function cloneDeep<T>(input: T): T {
  return _.cloneDeep(input);
}
