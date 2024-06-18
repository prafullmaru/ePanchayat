import { of, Observable } from '@rxjs-exports';
import { Vehicle } from './model';

export const testData: Observable<Vehicle[]> = of([
  {
    id: 1,
    registrationNumber: 'MH12JH1952',
    owner: 'Prafull Maru',
    lastModifiedBy: 'System',
    lastModifiedOn: new Date(),
  },
]);
