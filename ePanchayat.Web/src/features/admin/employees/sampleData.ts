import { of, Observable } from '@rxjs-exports';
import { Model } from './model';

export const testData: Observable<Model[]> = of([
  {
    id: 1,
    lastModifiedBy: 'System',
    lastModifiedOn: new Date(),
  },
]);
