import { HttpClient } from '@angular/common/http';
import { DestroyRef, Service, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { finalize, forkJoin, map } from 'rxjs';

import { Machine, MachineState, MachineView } from './production-line.models';

@Service()
export class ProductionLine {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private readonly machineData = signal<readonly MachineView[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorMessage = signal<string | null>(null);
  private readonly selection = signal<string | null>(null);

  readonly machines = this.machineData.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorMessage.asReadonly();
  readonly selectedMachineId = this.selection.asReadonly();

  constructor() {
    this.load();
  }

  select(id: string): void {
    if (this.machineData().some((machine) => machine.id === id)) {
      this.selection.set(id);
    }
  }

  load(): void {
    if (this.loadingState()) return;

    this.loadingState.set(true);
    this.errorMessage.set(null);
    forkJoin({
      machines: this.http.get<readonly Machine[]>('data/machines.json'),
      states: this.http.get<readonly MachineState[]>('data/machine-states.json'),
    })
      .pipe(
        map(({ machines, states }) => {
          if (!Array.isArray(machines) || !machines.length || !Array.isArray(states)) {
            throw new Error('Invalid production line data');
          }
          const statesById = new Map(states.map((state) => [state.id, state]));
          const ids = new Set<string>();
          return machines
            .map((machine): MachineView => {
              const state = statesById.get(machine.stateId);
              if (
                !state ||
                !['running', 'alarm', 'warning'].includes(state.id) ||
                !machine.id ||
                ids.has(machine.id) ||
                !machine.name ||
                !Number.isFinite(machine.order) ||
                !state.label ||
                !/^#[\da-f]{6}$/i.test(state.color)
              ) {
                throw new Error('Invalid machine or state');
              }
              ids.add(machine.id);
              return { ...machine, state };
            })
            .sort((a, b) => a.order - b.order);
        }),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loadingState.set(false)),
      )
      .subscribe({
        next: (machines) => {
          this.machineData.set(machines);
          if (!machines.some((machine) => machine.id === this.selection())) {
            this.selection.set(null);
          }
        },
        error: () => {
          this.machineData.set([]);
          this.selection.set(null);
          this.errorMessage.set('Unable to load the production line. Please try again.');
        },
      });
  }
}
