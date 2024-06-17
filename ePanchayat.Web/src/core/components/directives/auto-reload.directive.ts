import { Directive } from '@angular/core';
import { areEqualDates } from '@core/services';

@Directive({
  selector: '[autoReload]',
})
export class AutoReloadDirective {
  startDate: Date;

  constructor() {}

  ngOnInit() {
    this.startDate = new Date(Date.now());
    window.addEventListener('focus', this.reloadWindow);
  }

  reloadWindow = () => {
    const currentDate = new Date(Date.now());
    if (!areEqualDates(this.startDate, currentDate)) {
      window.location.reload();
    }
  };

  ngOnDestory() {
    window.addEventListener('focus', this.reloadWindow);
  }
}
