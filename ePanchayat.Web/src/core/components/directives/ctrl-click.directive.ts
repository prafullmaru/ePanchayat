import {
  Directive,
  ElementRef,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[ctrlClickHandler]',
})
export class CtrlClickHandlerDirective implements OnInit, OnDestroy {
  private unsubscribe: any;

  // tslint:disable-next-line:no-output-rename
  @Output('copyEvent') copyEvent = new EventEmitter();

  constructor(
    private readonly renderer: Renderer2,
    private readonly element: ElementRef,
  ) {}

  ngOnInit() {
    this.unsubscribe = this.renderer.listen(
      this.element.nativeElement,
      'keydown',
      (event) => {
        if (event.ctrlKey) {
          event.preventDefault();
          event.stopPropagation();
          document.getSelection().removeAllRanges();

          if (event.code === 'KeyC') {
            this.copyEvent.emit(event);
          }
        }
      },
    );
  }

  ngOnDestroy() {
    if (!this.unsubscribe) {
      return;
    }
    this.unsubscribe();
  }
}
