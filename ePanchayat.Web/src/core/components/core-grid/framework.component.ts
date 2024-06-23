import { ActionLinkCellRenderer } from './action-link.renderer';
import { FloatingFilterComponent } from './floating-filter.component';
import { CheckboxCellRenderer } from './checkbox.renderer';
import { gridConstants } from './model';
import { AmountInputCellRenderer } from './amount-input.renderer';
import { AmountInputCellEditor } from './amount-input.editor';
import { CellWithErrorCellRenderer } from './cell-with-error.renderer';
import { LoadingOverlayComponent } from './loading-overlay.component';

export const frameworkComponents = {
  [gridConstants.actionLinkRenderer]: ActionLinkCellRenderer,
  [gridConstants.checkboxRenderer]: CheckboxCellRenderer,
  [gridConstants.amountInputRenderer]: AmountInputCellRenderer,
  [gridConstants.floatingFilterComponent]: FloatingFilterComponent,
  [gridConstants.amountInputEditor]: AmountInputCellEditor,
  [gridConstants.cellWithErrorRenderer]: CellWithErrorCellRenderer,
  [gridConstants.loadingOverlayComponent]: LoadingOverlayComponent,
};
