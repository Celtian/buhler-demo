import type { IconName } from '@/ui';

export type StateId = 'running' | 'alarm' | 'warning';

export interface Machine {
  readonly id: string;
  readonly name: string;
  readonly order: number;
  readonly icon: IconName;
  readonly stateId: StateId;
}

export interface MachineState {
  readonly id: StateId;
  readonly label: string;
  readonly icon: IconName;
  readonly color: string;
}

export interface MachineView extends Machine {
  readonly state: MachineState;
}
