import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'checkbox-renderer',
  template: ` <div class="wrapper">
    <input
      class="checkbox"
      type="checkbox"
      [checked]="value === 1 ? true : false"
      (change)="value = $event.target.checked ? 1 : 0; invokeParentMethod()"
    />
  </div>`,
  styles: [
    '.wrapper { padding: 0 30% 30%} .wrapper .checkbox { margin-top:0px }',
  ],
})
export class CheckboxCellRenderer implements ICellRendererAngularComp {
  params: any;
  value: any;

  agInit(params: any): void {
    this.params = params;
    this.value = params.value;
  }

  invokeParentMethod() {
    this.params.colDef.cellRendererOutputEvent(this.params.data, {
      currentValue: this.value,
    });
  }

  refresh(): boolean {
    return false;
  }
}
