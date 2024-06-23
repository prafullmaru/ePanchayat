import { Component, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AmountFormatterDirective } from '../directives/amount-formatter.directive';

@Component({
  selector: 'amount-input-renderer',
  templateUrl: 'amount-input.renderer.html',
  styleUrls: ['amount-input.renderer.scss'],
})
export class AmountInputCellRenderer implements ICellRendererAngularComp {
  params: any;
  value: string;
  cssClass: string;
  @ViewChild(AmountFormatterDirective, { static: true })
  amountFormatter: AmountFormatterDirective;

  agInit(params: any): void {
    this.params = params;
    this.cssClass = params.class;
    this.value = params.value;
  }

  refresh(): boolean {
    return false;
  }

  onClick(event) {
    event.srcElement.select();
  }

  onChange(newValue: string) {
    const validity = this.amountFormatter.validate();
    this.params.data[this.params.colDef.field] = newValue;

    this.params.colDef.cellRendererOutputEvent({
      ...this.params,
      newValue,
      oldValue: this.value,
      isValid: !(validity && validity.invalidAmount),
    });
  }

  // this code is lifted from ag-grid editor component. this is how they make sure cursor navigation (left/right key) works inside editor cells
  suppressGridNavigation(event) {
    if (event.keyCode === 37 || event.keyCode === 39) {
      event.stopPropagation();
    }
    return true;
  }
}
