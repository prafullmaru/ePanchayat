import { Component } from '@angular/core';

@Component({
  selector: 'block-ui-template',
  template: `
    <div class="block-ui-template">
      <div class="block-ui-spinner"></div>
    </div>
  `,
  styles: [
    `
      .block-ui-spinner {
        background-image: url(../assets/loading.gif);
        width: 100px;
        height: 100px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 10px;
        margin-left: 45%;
      }
    `,
  ],
})
export class BlockUiTemplateComponent {}
