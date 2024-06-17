import { isNullOrUndefined } from './is-null-or-undefined';

export function deleteUndefinedProps(input): void {
  for (const prop in input) {
    if (isNullOrUndefined(input[prop])) {
      delete input[prop];
    }
  }
}
