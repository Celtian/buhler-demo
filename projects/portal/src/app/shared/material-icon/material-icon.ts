import { Component, computed, input } from '@angular/core';

import { MaterialIconName } from '../../services/production-line.models';

@Component({
  selector: 'app-material-icon',
  template: `<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
    <use [attr.href]="href()" />
  </svg>`,
  styles: `
    :host {
      display: inline-flex;
      width: 1.5rem;
      height: 1.5rem;
      flex-shrink: 0;
    }
    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  `,
})
export class MaterialIcon {
  readonly name = input.required<MaterialIconName>();
  protected readonly href = computed(() => `icons/material.svg#${this.name()}`);
}
