import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'core-radio-button',
  templateUrl: './core-radio-button.component.html',
})
export class CoreRadioButtonComponent {
  @Input() model: string;
  @Input() buttonValue: string;
  @Input() buttonName: string;
  @Input() description: string;
  @Output() modelChange = new EventEmitter<string>();
}
