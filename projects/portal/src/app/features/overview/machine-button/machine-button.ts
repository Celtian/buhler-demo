import { Component, computed, input, output } from '@angular/core';

import { Button, type ButtonColor, Icon } from '@/ui';

import { MachineView } from '../../../models/production-line.models';

@Component({
  selector: 'app-machine-button',
  imports: [Button, Icon],
  templateUrl: './machine-button.html',
  host: { class: 'block shrink-0' },
})
export class MachineButton {
  readonly machine = input.required<MachineView>();
  readonly selected = input(false);
  readonly view = input<'navigation' | 'tile'>('tile');
  readonly choose = output<string>();
  protected readonly buttonColor = computed<ButtonColor>(() => {
    switch (this.machine().state.id) {
      case 'alarm':
        return 'danger';
      case 'warning':
        return 'warning';
      default:
        return 'default';
    }
  });
  protected readonly buttonClass = computed(
    () => `machine ${this.view()} ${this.machine().state.id}`,
  );
  protected readonly accessibleLabel = computed(
    () => `${this.machine().name}, ${this.machine().state.label}`,
  );
}
