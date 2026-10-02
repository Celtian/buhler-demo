import { Component, ElementRef, afterRenderEffect, inject, signal, viewChild } from '@angular/core';

import { Spinner } from '@/ui';

import { ProductionLine } from '../../../services/production-line';
import { MachineButton } from '../machine-button/machine-button';

@Component({
  selector: 'app-overview-page',
  imports: [MachineButton, Spinner],
  templateUrl: './overview-page.html',
  host: { class: 'flex flex-1 flex-col' },
})
export class OverviewPage {
  protected readonly line = inject(ProductionLine);
  private readonly navigation = viewChild<ElementRef<HTMLElement>>('machineNavigation');
  private readonly retryButton = viewChild<ElementRef<HTMLButtonElement>>('retryButton');
  private readonly restoreFocus = signal(false);

  constructor() {
    afterRenderEffect(() => {
      if (!this.restoreFocus() || this.line.loading()) return;

      const target = this.line.error()
        ? this.retryButton()?.nativeElement
        : this.navigation()?.nativeElement.querySelector<HTMLButtonElement>('button');
      if (target) {
        target.focus();
        this.restoreFocus.set(false);
      }
    });
  }

  protected retry(): void {
    this.restoreFocus.set(true);
    this.line.load();
  }
}
