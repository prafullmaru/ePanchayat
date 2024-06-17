import {
  trigger,
  style,
  animate,
  transition,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const fadeAnimation: AnimationTriggerMetadata = trigger(
  'enterAnimation',
  [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms linear', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('300ms linear', style({ opacity: 0 })),
    ]),
  ],
);
