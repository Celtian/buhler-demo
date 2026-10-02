import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Service, inject } from '@angular/core';

@Service()
export class UpdateAppService {
  private readonly dialog = inject(Dialog);
  private readonly overlay = inject(Overlay);
  private readonly document = inject(DOCUMENT);
  private isOpen = false;

  public async open(): Promise<void> {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;

    try {
      const { UpdateApp, UpdateAppContainer } = await import('./update-app');
      const dialogRef = this.dialog.open<boolean>(UpdateApp, {
        ariaDescribedBy: 'update-app-description',
        ariaLabelledBy: 'update-app-title',
        ariaModal: false,
        autoFocus: false,
        container: UpdateAppContainer,
        disableClose: false,
        hasBackdrop: false,
        maxWidth: 'calc(100vw - 1rem)',
        positionStrategy: this.overlay.position().global().left('0.5rem').bottom('0.5rem'),
        restoreFocus: true,
        role: 'dialog',
        scrollStrategy: this.overlay.scrollStrategies.noop(),
        width: '20rem',
      });

      dialogRef.closed.subscribe((reload) => {
        this.isOpen = false;
        if (reload) {
          this.document.location.reload();
        }
      });
    } catch (error: unknown) {
      this.isOpen = false;
      throw error;
    }
  }
}
