import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SelectOption } from '@core/models';
import { isChangeDefinedAndDifferent } from '@core/services';

@Component({
  selector: 'core-dropdown',
  templateUrl: './core-dropdown.component.html',
  styleUrls: ['./core-dropdown.component.scss'],
})
export class CoreDropdownComponent {
  @Input() selectedValue = '';
  @Input() options: SelectOption[] = [];
  @Output() optionChange = new EventEmitter<string>();

  selectedOption: SelectOption;

  ngOnInit() {}

  ngOnChanges(changes) {
    if (
      !isChangeDefinedAndDifferent(changes.selectedValue) &&
      !isChangeDefinedAndDifferent(changes.options)
    ) {
      return;
    }
    this.selectedOption = this.options?.find(
      (option) => this.selectedValue === option.id
    );
  }

  setSelectedOption(selectedOption: SelectOption) {
    this.selectedOption = selectedOption;
    for (const option of this.options) {
      if (option.id === selectedOption.id) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    }

    this.optionChange.emit(selectedOption.id);
  }
}
