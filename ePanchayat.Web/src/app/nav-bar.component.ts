import { Component, Input, OnInit } from '@angular/core';
import { TopMenu } from '@core/services';
import {
  BsModalRef,
  // BsModalService
} from 'ngx-bootstrap/modal';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() topMenus: TopMenu[];

  isErrorGridVisible = false;
  modalRef: BsModalRef;
  menuBarWidth = 0;

  constructor() {}

  async ngOnInit() {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.menuBarWidth = entry.contentRect.width;
      }
    });

    resizeObserver.observe(document.querySelector('.navbar-modules'));
  }
}
