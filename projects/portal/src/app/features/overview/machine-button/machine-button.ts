import { Component, computed, input, output } from '@angular/core';

import { Icon } from '@/ui';

import { MachineView } from '../../../services/production-line.models';

@Component({
  selector: 'app-machine-button',
  imports: [Icon],
  template: `
    <button
      type="button"
      [class]="buttonClass()"
      [class.selected]="selected()"
      [attr.aria-label]="accessibleLabel()"
      [attr.aria-pressed]="selected()"
      (click)="choose.emit(machine().id)"
    >
      <ui-icon class="state-icon" [style.color]="statusColor()" [name]="machine().state.icon" />
      @if (view() === 'tile') {
        <ui-icon class="machine-icon" [name]="machine().icon" />
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
