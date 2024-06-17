import { AnimationTriggerMetadata } from '@angular/animations';
import { fadeAnimation } from './fade.animation';
import { slideInOutAnimation } from './slide-in-out.animation';
import { routeStateAnimation } from './route-state.animation';
export function getAnimations(): AnimationTriggerMetadata[] {
  return [fadeAnimation, slideInOutAnimation, routeStateAnimation];
}
