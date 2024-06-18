import { Component, ViewEncapsulation } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

import { ActionLinkRendererParams } from './model';

@Component({
  selector: 'action-link-renderer',
  templateUrl: 'action-link.renderer.html',
  styleUrls: ['action-link.renderer.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ActionLinkCellRenderer implements ICellRendererAngularComp {
  params: ActionLinkRendererParams;
  value: string;
  linkText: string;
  linkIcon: string;
  actionStatus: string;
  actionStatusMessage: string;
  isHidden = false;
  isDisabled = false;
  isRowGroup = false;

  agInit(params: any): void {
    this.params = params as ActionLinkRendererParams;
    if (params.propName && params.data) {
      this.value = params.data[params.propName];
    }

    this.isRowGroup = this.params.node.group;
    this.linkText = this.isRowGroup
      ? this.params.rowGroupActionLinkText
      : this.params.actionLinkText;
    this.linkIcon = this.isRowGroup
      ? this.params.rowGroupActionLinkIcon
      : this.params.actionLinkIcon;

    this.actionStatus = this.isRowGroup
      ? this.params.rowGroupActionStatus
      : this.params.actionStatus;
    this.actionStatusMessage = this.isRowGroup
      ? this.params.rowGroupActionStatusMessage
      : this.params.actionStatusMessage;

    this.isHidden =
      typeof this.params.hide === 'function'
        ? this.params.hide(params)
        : this.params.hide;
    this.isDisabled =
      typeof this.params.disable === 'function'
        ? this.params.disable(params)
        : this.params.disable;
  }

  invokeParentMethod() {
    const data = this.isRowGroup ? this.params.node.key : this.params.data;
    this.params.colDef.cellRendererOutputEvent(data, this.isRowGroup);
  }

  refresh(): boolean {
    return false;
  }
}
