import { NgModule } from '@angular/core';
import { LocalStorageModule } from 'angular-2-local-storage';

import { WindowRefService } from './windows-ref.service';

@NgModule({
  imports: [LocalStorageModule],
  providers: [WindowRefService],
})
export class WindowRefModule {}
