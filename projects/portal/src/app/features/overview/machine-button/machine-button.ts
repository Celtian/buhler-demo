import { Component, computed, input, output } from '@angular/core';

import { MachineView } from '../../../services/production-line.models';
import { MaterialIcon } from '../../../shared/material-icon/material-icon';

@Component({
  selector: 'app-machine-button',
  imports: [MaterialIcon],
  template: `
    <button
      type="button"
      [class]="buttonClass()"
      [class.selected]="selected()"
      [attr.aria-label]="accessibleLabel()"
      [attr.aria-pressed]="selected()"
      (click)="choose.emit(machine().id)"
    >
      <app-material-icon
        class="state-icon"
        [style.color]="statusColor()"
        [name]="machine().state.icon"
      />
      @if (view() === 'tile') {
        <app-material-icon class="machine-icon" [name]="machine().icon" />
      }
      <span>{{ machine().name }}</span>
    </button>
  `,
  styleUrl: './machine-button.css',
})
export class MachineButton {
  readonly machine = input.required<MachineView>();
  readonly selected = input(false);
  readonly view = input<'navigation' | 'tile'>('tile');
  readonly choose = output<string>();
  protected readonly buttonClass = computed(
    () => `machine ${this.view()} ${this.machine().state.id}`,
  );
  protected readonly accessibleLabel = computed(
    () => `${this.machine().name}, ${this.machine().state.label}`,
  );
  protected readonly statusColor = computed(() =>
    this.machine().state.id === 'running' ? this.machine().state.color : 'currentColor',
  );
}
