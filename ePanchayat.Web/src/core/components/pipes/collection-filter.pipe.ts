import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collectionfilter',
})
export class CollectionFilterPipe implements PipeTransform {
  transform(
    collection: any[],
    propName: string,
    filterVal: string,
    matchType = 'startswith',
  ) {
    if (!collection || !propName || !filterVal) {
      return collection;
    }

    return collection.filter((p) => {
      const filterValLowerCase = filterVal.toLowerCase();
      const propValue = p[propName].toString().toLowerCase();
      switch (matchType) {
        case 'exact':
          return propValue === filterValLowerCase;
        case 'startsWith':
          return propValue.startsWith(filterValLowerCase);
      }
    });
  }
}
