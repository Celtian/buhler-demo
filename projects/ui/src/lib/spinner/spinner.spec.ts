import { TestBed } from '@angular/core/testing';

import { Spinner, type SpinnerSize } from './spinner';

describe('Spinner', () => {
  it('renders a loading status with a decorative SVG', async () => {
    const fixture = TestBed.createComponent(Spinner);
    await fixture.whenStable();

    const host = fixture.nativeElement as HTMLElement;
    const status = host.querySelector('[role="status"]');
    const svg = host.querySelector('svg');
    expect(status?.getAttribute('aria-live')).toBe('polite');
    expect(status?.getAttribute('aria-atomic')).toBe('true');
    expect(status?.getAttribute('aria-busy')).toBe('true');
    expect(host.querySelector('.sr-only')?.textContent).toBe('Loading');
    expect(svg?.getAttribute('aria-hidden')).toBe('true');
    expect(svg?.classList).toContain('size-8');
    expect(host.querySelectorAll('path')).toHaveLength(2);
    expect(host.querySelectorAll('path')[1].getAttribute('fill')).toBe('inherit');
  });

  it('updates all sizes and restores the default when size is undefined', async () => {
    const fixture = TestBed.createComponent(Spinner);
    const sizes: [SpinnerSize, string][] = [
      ['xs', 'size-4'],
      ['sm', 'size-6'],
      ['md', 'size-8'],
      ['lg', 'size-10'],
    ];
    const host = fixture.nativeElement as HTMLElement;

    for (const [size, sizeClass] of sizes) {
      fixture.componentRef.setInput('size', size);
      await fixture.whenStable();
      expect(host.querySelector('svg')?.classList).toContain(sizeClass);
    }

    fixture.componentRef.setInput('size', undefined);
    await fixture.whenStable();
    expect(host.querySelector('svg')?.classList).toContain('size-8');
    expect(host.querySelector('svg')?.classList).not.toContain('size-10');
  });

  it('updates and trims loading text without interpreting markup', async () => {
    const fixture = TestBed.createComponent(Spinner);
    const host = fixture.nativeElement as HTMLElement;

    for (const text of ['  Loading machines  ', '<strong>Loading</strong>', '']) {
      fixture.componentRef.setInput('loadingText', text);
      await fixture.whenStable();
      expect(host.querySelector('.sr-only')?.textContent).toBe(text.trim());
      expect(host.querySelector('strong')).toBeNull();
    }
  });
});
