import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmountFormatterDirective } from './amount-formatter.directive';
import { AutoFocusDirective } from './auto-focus.directive';
import { AutoReloadDirective } from './auto-reload.directive';
import { FocusOnDemandDirective } from './focus-on-demand.directive';
import { HighlightDirective } from './highlight.directive';
import { NumberFormatterDirective } from './number-formatter.directive';
import { SliderDirective } from './slider.directive';
import { CtrlClickHandlerDirective } from './ctrl-click.directive';

const directives = [
  AutoFocusDirective,
  FocusOnDemandDirective,
  HighlightDirective,
  NumberFormatterDirective,
  AmountFormatterDirective,
  SliderDirective,
  AutoReloadDirective,
  CtrlClickHandlerDirective,
];

@NgModule({
  imports: [CommonModule],
  declarations: directives,
  exports: directives,
})
export class CoreDirectivesModule {}
