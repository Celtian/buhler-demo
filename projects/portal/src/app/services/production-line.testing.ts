import { Machine, MachineState } from './production-line.models';

export const testMachines: readonly Machine[] = [
  { id: 'bag-closer', name: 'Closer', order: 4, icon: 'grid_on', stateId: 'warning' },
  { id: 'scale', name: 'Scale', order: 1, icon: 'system_update_alt', stateId: 'running' },
  { id: 'packer', name: 'Packer', order: 3, icon: 'call_to_action', stateId: 'running' },
  { id: 'bag-attach', name: 'Attacher', order: 2, icon: 'chrome_reader_mode', stateId: 'alarm' },
];

export const testStates: readonly MachineState[] = [
  { id: 'running', label: 'Running', icon: 'settings_backup_restore', color: '#398000' },
  { id: 'alarm', label: 'Alarm', icon: 'error_outline', color: '#D32F2F' },
  { id: 'warning', label: 'Warning', icon: 'warning', color: '#F59E0B' },
];
