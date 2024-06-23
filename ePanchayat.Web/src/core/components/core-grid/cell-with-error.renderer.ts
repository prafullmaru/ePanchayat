import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { CellWithErrorCellRendererParams } from './model';

@Component({
  selector: 'cell-with-error-renderer',
  templateUrl: 'cell-with-error.renderer.html',
  styleUrls: ['cell-with-error.renderer.scss'],
})
export class CellWithErrorCellRenderer implements ICellRendererAngularComp {
  params: CellWithErrorCellRendererParams;
  titleText: string;

  agInit(params: CellWithErrorCellRendererParams): void {
    this.params = params;
    if (params.validateError) {
      this.titleText = params.validateError();
    }
  }

  refresh(): boolean {
    return false;
  }
}
