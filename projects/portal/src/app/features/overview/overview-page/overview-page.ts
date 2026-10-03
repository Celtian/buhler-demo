import { httpResource } from '@angular/common/http';
import { Component, computed, linkedSignal } from '@angular/core';

import { Button, Spinner } from '@/ui';

import { Machine, MachineState, MachineView } from '../../../models/production-line.models';
import { MachineButton } from '../machine-button/machine-button';

@Component({
  selector: 'app-overview-page',
  imports: [Button, MachineButton, Spinner],
  templateUrl: './overview-page.html',
  host: { class: 'flex flex-1 flex-col' },
})
export class OverviewPage {
  private readonly machineData = httpResource<readonly Machine[]>(() => 'data/machines.json');
  private readonly stateData = httpResource<readonly MachineState[]>(
    () => 'data/machine-states.json',
  );

  protected readonly loading = computed(
    () => this.machineData.isLoading() || this.stateData.isLoading(),
  );
  protected readonly error = computed(() => {
    const states = this.stateData.hasValue() ? this.stateData.value() : [];
    const missingState =
      this.machineData.hasValue() &&
      this.stateData.hasValue() &&
      this.machineData
        .value()
        .some((machine) => !states.some((state) => state.id === machine.stateId));
    return this.machineData.error() || this.stateData.error() || missingState
      ? 'Unable to load the production line. Please try again.'
      : null;
  });
  protected readonly machines = computed<readonly MachineView[]>(() => {
    if (this.error() || !this.machineData.hasValue() || !this.stateData.hasValue()) return [];

    const statesById = new Map(this.stateData.value().map((state) => [state.id, state]));
    return this.machineData
      .value()
      .flatMap((machine) => {
        const state = statesById.get(machine.stateId);
        return state ? [{ ...machine, state }] : [];
      })
      .sort((a, b) => a.order - b.order);
  });

  private readonly selection = linkedSignal<readonly MachineView[], string | null>({
    source: this.machines,
    computation: (machines, previous) =>
      machines.some((machine) => machine.id === previous?.value) ? (previous?.value ?? null) : null,
  });
  protected readonly selectedMachineId = this.selection.asReadonly();

  protected select(id: string): void {
    if (this.machines().some((machine) => machine.id === id)) {
      this.selection.set(id);
    }
  }

  protected retry(): void {
    if (this.loading()) return;

    this.machineData.reload();
    this.stateData.reload();
  }
}
