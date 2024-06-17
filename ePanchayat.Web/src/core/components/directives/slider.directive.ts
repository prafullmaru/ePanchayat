import {
  Directive,
  ElementRef,
  OnChanges,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { isChangeDifferentAndNotFirst, generateGuid } from '@core/services';

@Directive({
  selector: '[slider]',
})
export class SliderDirective implements OnChanges, OnInit {
  @Input('slider') isHidden: boolean;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.id = generateGuid();
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (!isChangeDifferentAndNotFirst(simpleChanges.isHidden)) {
      return;
    }
    if (this.isHidden) {
      $(this.elementRef.nativeElement).slideUp();
    } else {
    }
  }
}
