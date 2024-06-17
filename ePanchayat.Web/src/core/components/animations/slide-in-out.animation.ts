import {
  trigger,
  style,
  transition,
  state,
  animate,
  group,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const slideInOutAnimation: AnimationTriggerMetadata = trigger(
  'slideInOut',
  [
    state(
      'in',
      style({
        'max-height': '500px',
        opacity: '1',
        visibility: 'visible',
      }),
    ),
    state(
      'out',
      style({
        'max-height': '0px',
        opacity: '0',
        visibility: 'hidden',
      }),
    ),
    transition('in => out', [
      group([
        animate(
          '400ms ease-in-out',
          style({
            opacity: '0',
          }),
        ),
        animate(
          '600ms ease-in-out',
          style({
            'max-height': '0px',
          }),
        ),
        animate(
          '700ms ease-in-out',
          style({
            visibility: 'hidden',
          }),
        ),
      ]),
    ]),
    transition('out => in', [
      group([
        animate(
          '1ms ease-in-out',
          style({
            visibility: 'visible',
          }),
        ),
        animate(
          '600ms ease-in-out',
          style({
            'max-height': '500px',
          }),
        ),
        animate(
          '800ms ease-in-out',
          style({
            opacity: '1',
          }),
        ),
      ]),
    ]),
  ],
);
