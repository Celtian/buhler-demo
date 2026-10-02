import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProductionLine } from './production-line';
import { testMachines, testStates } from './production-line.testing';

describe('ProductionLine', () => {
  let line: ProductionLine;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    line = TestBed.inject(ProductionLine);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  function completeLoad(): void {
    http.expectOne('data/machines.json').flush(testMachines);
    http.expectOne('data/machine-states.json').flush(testStates);
  }

  it('waits for both files, sorts machines and joins each state by id', () => {
    expect(line.loading()).toBe(true);
    expect(line.selectedMachineId()).toBeNull();
    http.expectOne('data/machines.json').flush(testMachines);
    expect(line.loading()).toBe(true);
    expect(line.machines()).toEqual([]);
    http.expectOne('data/machine-states.json').flush(testStates);
    expect(line.loading()).toBe(false);
    expect(line.error()).toBeNull();
    expect(line.machines().map((machine) => machine.id)).toEqual([
      'scale',
      'bag-attach',
      'packer',
      'bag-closer',
    ]);
    expect(line.machines().map((machine) => machine.state.label)).toEqual([
      'Running',
      'Alarm',
      'Running',
      'Warning',
    ]);
  });

  it('shows an error for a failed request and recovers on retry', () => {
    http.expectOne('data/machine-states.json').flush(testStates);
    http
      .expectOne('data/machines.json')
      .flush('Unavailable', { status: 503, statusText: 'Unavailable' });
    expect(line.loading()).toBe(false);
    expect(line.error()).toContain('Unable to load');
    expect(line.machines()).toEqual([]);
    line.load();
    expect(line.error()).toBeNull();
    completeLoad();
    expect(line.machines()).toHaveLength(4);
  });

  it('handles a failed state request', () => {
    http.expectOne('data/machines.json').flush(testMachines);
    http
      .expectOne('data/machine-states.json')
      .flush('Unavailable', { status: 503, statusText: 'Unavailable' });
    expect(line.error()).toContain('Unable to load');
    expect(line.loading()).toBe(false);
  });

  it('rejects a missing referenced state', () => {
    http.expectOne('data/machines.json').flush(testMachines);
    http
      .expectOne('data/machine-states.json')
      .flush(testStates.filter((state) => state.id !== 'alarm'));
    expect(line.error()).toContain('Unable to load');
    expect(line.machines()).toEqual([]);
  });

  it('rejects duplicate machines instead of rendering ambiguous selections', () => {
    http.expectOne('data/machines.json').flush([testMachines[0], testMachines[0]]);
    http.expectOne('data/machine-states.json').flush(testStates);
    expect(line.error()).toContain('Unable to load');
  });

  it('does not start overlapping loads', () => {
    line.load();
    completeLoad();
  });

  it('selects known machines without changing their status and ignores unknown ids', () => {
    completeLoad();
    const machines = line.machines();
    line.select('bag-attach');
    expect(line.selectedMachineId()).toBe('bag-attach');
    line.select('unknown');
    expect(line.selectedMachineId()).toBe('bag-attach');
    expect(line.machines()).toBe(machines);
  });
});
