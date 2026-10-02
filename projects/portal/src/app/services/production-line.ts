import { httpResource } from '@angular/common/http';
import { Service, computed, linkedSignal } from '@angular/core';

import { Machine, MachineState, MachineView } from './production-line.models';

@Service()
export class ProductionLine {
  private readonly machineData = httpResource<readonly Machine[]>(() => 'data/machines.json');
  private readonly stateData = httpResource<readonly MachineState[]>(
    () => 'data/machine-states.json',
  );

  readonly loading = computed(() => this.machineData.isLoading() || this.stateData.isLoading());
  readonly error = computed(() => {
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
  readonly machines = computed<readonly MachineView[]>(() => {
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
  readonly selectedMachineId = this.selection.asReadonly();

  select(id: string): void {
    if (this.machines().some((machine) => machine.id === id)) {
      this.selection.set(id);
    }
  }

  load(): void {
    if (this.loading()) return;

    this.machineData.reload();
    this.stateData.reload();
  }
}
