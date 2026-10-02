import { Component } from '@angular/core';

@Component({
  selector: 'ui-logo',
  imports: [],
  templateUrl: './logo.html',
  styles: `
    :host {
      display: inline-block;
      line-height: 0;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
    }
  `,
})
export class Logo {
  public readonly primaryColor = '#00a89c';
}
