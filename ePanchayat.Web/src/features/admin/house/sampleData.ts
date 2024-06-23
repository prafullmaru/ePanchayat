import { of, Observable } from '@rxjs-exports';
import { House } from './model';

export const testData: Observable<House[]> = of([
  {
    id: 1,
    lastModifiedBy: 'System',
    lastModifiedOn: new Date(),
  },
]);
