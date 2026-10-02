import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLine } from '../../../services/production-line';
import { testMachines, testStates } from '../../../services/production-line.testing';
import { OverviewPage } from './overview-page';

describe('OverviewPage', () => {
  let fixture: ComponentFixture<OverviewPage>;
  let http: HttpTestingController;
  let root: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    fixture = TestBed.createComponent(OverviewPage);
    root = fixture.nativeElement as HTMLElement;
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  async function completeLoad(): Promise<void> {
    http.expectOne('data/machines.json').flush(testMachines);
    http.expectOne('data/machine-states.json').flush(testStates);
    await fixture.whenStable();
  }

  function getButton(selector: string): HTMLButtonElement {
    const button = root.querySelector<HTMLButtonElement>(selector);
    if (!button) throw new Error(`Missing button: ${selector}`);
    return button;
  }

  it('announces loading and renders all four machines in both places with accessible states', async () => {
    await fixture.whenStable();
    expect(root.querySelector('[role="status"]')?.textContent).toContain('Loading');
    await completeLoad();
    expect(root.querySelectorAll('nav button')).toHaveLength(4);
    expect(root.querySelectorAll('ol button')).toHaveLength(4);
    expect(root.querySelectorAll('[aria-pressed="true"]')).toHaveLength(0);
    expect(getButton('nav .alarm').getAttribute('aria-label')).toBe('Attacher, Alarm');
    expect(getButton('ol .warning').getAttribute('aria-label')).toBe('Closer, Warning');
  });

  it('synchronizes selection from navigation to tiles and back', async () => {
    await completeLoad();
    getButton('nav .alarm').click();
    await fixture.whenStable();
    expect(getButton('nav .alarm').getAttribute('aria-pressed')).toBe('true');
    expect(getButton('ol .alarm').getAttribute('aria-pressed')).toBe('true');
    getButton('ol .warning').click();
    await fixture.whenStable();
    expect(getButton('nav .warning').getAttribute('aria-pressed')).toBe('true');
    expect(getButton('ol .warning').getAttribute('aria-pressed')).toBe('true');
    expect(getButton('nav .alarm').getAttribute('aria-pressed')).toBe('false');
    expect(root.querySelectorAll('[aria-pressed="true"]')).toHaveLength(2);
    expect(TestBed.inject(ProductionLine).machines()[1].state.id).toBe('alarm');
  });

  it('announces errors and retries through the visible button', async () => {
    http.expectOne('data/machine-states.json').flush(testStates);
    http
      .expectOne('data/machines.json')
      .flush('Unavailable', { status: 503, statusText: 'Unavailable' });
    await fixture.whenStable();
    expect(root.querySelector('[role="alert"]')?.textContent).toContain('Unable to load');
    getButton('.retry').click();
    await fixture.whenStable();
    expect(root.querySelector('[role="status"]')?.textContent).toContain('Loading');
    await completeLoad();
    expect(root.querySelectorAll('ol button')).toHaveLength(4);
    expect(document.activeElement).toBe(getButton('nav .running'));
  });
});
