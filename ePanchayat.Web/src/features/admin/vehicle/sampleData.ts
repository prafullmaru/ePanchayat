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
  {
    id: 2,
    registrationNumber: 'MH12JH1952',
    owner: 'Mohan Divraniya',
    lastModifiedBy: 'System',
    lastModifiedOn: new Date(),
  },
  {
    id: 3,
    registrationNumber: 'MH12JH1952',
    owner: 'Dipak Narigara',
    lastModifiedBy: 'System',
    lastModifiedOn: new Date(),
  },
  {
    id: 2,
    registrationNumber: 'MH14KL1332',
    owner: 'Mohan Divraniya',
    lastModifiedBy: 'System',
    lastModifiedOn: new Date(),
  },
  {
    id: 3,
    registrationNumber: 'MH12AB5652',
    owner: 'Dipak Narigara',
    lastModifiedBy: 'System',
    lastModifiedOn: new Date(),
  },
]);
