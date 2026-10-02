import { CdkDialogContainer, DialogRef } from '@angular/cdk/dialog';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { Component, inject } from '@angular/core';

import { Button } from '../button/button';

@Component({
  selector: 'ui-update-app-container',
  imports: [CdkPortalOutlet],
  template: '<ng-template cdkPortalOutlet />',
})
export class UpdateAppContainer extends CdkDialogContainer {
  private previousFocus: HTMLElement | null = null;

  protected override _contentAttached(): void {
    // A nonmodal notification must neither move nor trap the operator's focus.
    const activeElement = this._document.activeElement;
    this.previousFocus = activeElement instanceof HTMLElement ? activeElement : null;
  }

  public override ngOnDestroy(): void {
    const activeElement = this._document.activeElement;
    if (
      (activeElement === this._document.body ||
        this._elementRef.nativeElement.contains(activeElement)) &&
      this.previousFocus?.isConnected
    ) {
      this.previousFocus.focus();
    }
    super.ngOnDestroy();
  }
}

@Component({
  selector: 'ui-update-app',
  imports: [Button],
  template: `
    <div class="p-4" aria-live="polite" aria-atomic="true">
      <h2 id="update-app-title" class="text-base font-semibold">Update available</h2>
      <p id="update-app-description" class="mt-1 text-sm">
        A new version is ready. Update to load the latest version.
      </p>
    </div>
    <div class="flex justify-end gap-3 px-4 pb-4">
      <button ui-button type="button" (click)="dismiss()">Dismiss</button>
      <button ui-button color="primary" type="button" (click)="update()">Update</button>
    </div>
  `,
  host: {
    class:
      'block w-full border border-neutral-600 border-t-4 border-t-primary-500 bg-surface text-text shadow-lg',
  },
})
export class UpdateApp {
  private readonly dialogRef = inject<DialogRef<boolean>>(DialogRef);

  protected dismiss(): void {
    this.dialogRef.close(false);
  }

  protected update(): void {
    this.dialogRef.close(true);
  }
}
