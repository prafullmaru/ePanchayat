import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';

import { WindowRefService, isChangeDefinedAndDifferent } from '@core/services';

@Directive({
  selector: '[gridHeightOffset]',
})
export class GridHeightOffsetDirective implements OnChanges {
  @Input() gridHeightOffset: number;
  @Input() gridHeight: string;
  @Output() gridResize = new EventEmitter<number>();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private windowRef: WindowRefService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (!isChangeDefinedAndDifferent(changes.gridHeightOffset)) {
      return;
    }
    this.setGridHeight();
  }

  @HostListener('window:resize')
  onResize() {
    this.setGridHeight();
  }

  private setGridHeight() {
    if (this.gridHeight) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'height',
        this.gridHeight
      );
      return;
    }

    if (this.gridHeightOffset === 0) {
      return;
    }

    const gridHeight =
      this.windowRef.window.innerHeight - this.gridHeightOffset;
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'height',
      gridHeight + 'px'
    );
    this.gridResize.emit(gridHeight);
  }
}
