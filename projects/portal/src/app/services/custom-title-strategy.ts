import { Service } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Service()
export class CustomTitleStrategy extends TitleStrategy {
  private readonly siteName = 'Bühler';

  public constructor() {
    super();
  }

  public updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    if (title) {
      document.title = `${title} · ${this.siteName}`;
    } else {
      document.title = this.siteName;
    }
  }
}
