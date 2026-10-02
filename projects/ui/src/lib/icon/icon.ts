import { Component, computed, input } from '@angular/core';

import { NgIcon } from '@ng-icons/core';
import {
  matErrorOutline,
  matGridOn,
  matSchedule,
  matSettingsBackupRestore,
  matSystemUpdateAlt,
  matWarning,
} from '@ng-icons/material-icons/baseline';
import {
  matAccountCircleOutline,
  matCallToActionOutline,
  matChromeReaderModeOutline,
} from '@ng-icons/material-icons/outline';

export type IconName =
  | 'system_update_alt'
  | 'chrome_reader_mode'
  | 'call_to_action'
  | 'grid_on'
  | 'settings_backup_restore'
  | 'error_outline'
  | 'warning'
  | 'schedule'
  | 'account_circle';

const icons = {
  system_update_alt: matSystemUpdateAlt,
  chrome_reader_mode: matChromeReaderModeOutline,
  call_to_action: matCallToActionOutline,
  grid_on: matGridOn,
  settings_backup_restore: matSettingsBackupRestore,
  error_outline: matErrorOutline,
  warning: matWarning,
  schedule: matSchedule,
  account_circle: matAccountCircleOutline,
} satisfies Record<IconName, string>;

@Component({
  selector: 'ui-icon',
  imports: [NgIcon],
  template: `<ng-icon aria-hidden="true" size="100%" [svg]="svg()" />`,
  styles: `
    :host {
      display: inline-flex;
      width: 1.5rem;
      height: 1.5rem;
      flex-shrink: 0;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  protected readonly svg = computed(() => icons[this.name()]);
}
