import {
  Component,
  ViewChild,
  AfterViewInit,
  ViewContainerRef,
  NgZone,
} from '@angular/core';
import { AmountFormatterDirective } from '../directives/amount-formatter.directive';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'amount-input-editor',
  templateUrl: 'amount-input.editor.html',
  styleUrls: ['amount-input.editor.scss'],
})
export class AmountInputCellEditor
  implements ICellEditorAngularComp, AfterViewInit
{
  params: any;
  value: string;
  CssClass: string;
  cellWidth: number;
  @ViewChild(AmountFormatterDirective, { static: true })
  amountFormatter: AmountFormatterDirective;
  @ViewChild('amount', { static: true, read: ViewContainerRef }) public amount;

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.amount.element.nativeElement.focus();
        this.amount.element.nativeElement.select();
      }, 0);
    });
  }

  agInit(params: any): void {
    this.params = params;
    this.value = params.value;
    this.cellWidth = params.width || 90;
  }

  getValue() {
    return this.value;
  }

  isPopup(): boolean {
    return false;
  }

  onClick(event) {
    event.srcElement.select();
  }
}
