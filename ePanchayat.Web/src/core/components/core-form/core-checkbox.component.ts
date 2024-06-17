import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'core-checkbox',
  templateUrl: './core-checkbox.component.html',
  styleUrls: ['./core-checkbox.component.scss'],
})
export class CoreCheckboxComponent {
  @Input() shape = 'p-square';
  @Input() animation = 'p-smooth';
  @Input() state = 'p-primary';
  @Input() fontClass = 'fal fa-check';
  @Input() labelClass = '';
  @Input() additionalClasses: string;
  @Input() disableTabbing = false;
  @Input() label: string;
  @Input() model: boolean;
  @Input() disabled = false;
  @Input() favorite = false;

  @Output() modelChange = new EventEmitter<boolean>();

  getFontClass() {
    if (this.favorite) {
      return this.model ? 'fas fa-star' : 'far fa-star';
    } else {
      return this.fontClass;
    }
  }
}
