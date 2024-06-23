import { of, Observable } from '@rxjs-exports';
import { House } from './model';

export const testData: Observable<House[]> = of([
  {
    houseId: 1,
    houseNumber: 'SR No-1',
    ownerId: 1,
    ownerFullName: 'Prafull Maru',
    landmark: '',
    lastModifiedOn: new Date(),
    lastModifiedBy: 1,
    lastModifiedByFullName: 'System',
    isActive: true,
  },
  {
    houseId: 1,
    houseNumber: 'SR No-2',
    ownerId: 2,
    ownerFullName: 'Mohan Divraniya',
    landmark: '',
    lastModifiedOn: new Date(),
    lastModifiedBy: 1,
    lastModifiedByFullName: 'System',
    isActive: true,
  },
  {
    houseId: 1,
    houseNumber: 'SR No-3',
    ownerId: 3,
    ownerFullName: 'Dipak Narigara',
    landmark: '',
    lastModifiedOn: new Date(),
    lastModifiedBy: 1,
    lastModifiedByFullName: 'System',
    isActive: true,
  },
]);
