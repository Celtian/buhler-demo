export type StateId = 'running' | 'alarm' | 'warning';
export type MaterialIconName =
  | 'system_update_alt'
  | 'chrome_reader_mode'
  | 'call_to_action'
  | 'grid_on'
  | 'settings_backup_restore'
  | 'error_outline'
  | 'warning'
  | 'schedule'
  | 'account_circle';

export interface Machine {
  readonly id: string;
  readonly name: string;
  readonly order: number;
  readonly icon: MaterialIconName;
  readonly stateId: StateId;
}

export interface MachineState {
  readonly id: StateId;
  readonly label: string;
  readonly icon: MaterialIconName;
  readonly color: string;
}

export interface MachineView extends Machine {
  readonly state: MachineState;
}
