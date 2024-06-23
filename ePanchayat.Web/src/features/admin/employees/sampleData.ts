import { of, Observable } from '@rxjs-exports';
import { Employee } from './model';

export const testData: Observable<Employee[]> = of([
  {
    id: 1,
    lastModifiedBy: 'System',
    lastModifiedOn: new Date(),
    isActive: false,
  },
]);
