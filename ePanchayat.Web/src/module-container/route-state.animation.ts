import {
  trigger,
  animate,
  transition,
  style,
  query,
  group,
} from '@angular/animations';

export const routeStateAnimation = trigger('routeState', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    group([
      query(
        ':enter',
        [style({ opacity: 0 }), animate(350, style({ opacity: 1 }))],
        { optional: true },
      ),
    ]),
  ]),
]);
