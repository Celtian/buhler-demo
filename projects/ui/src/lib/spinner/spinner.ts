import { Component, computed, input } from '@angular/core';

import { type VariantProps, cva } from 'class-variance-authority';

import { buildClasses } from '../helpers/tailwind';

const spinnerStyles = cva(
  'inline animate-spin fill-primary-700 text-neutral-300 motion-reduce:animate-none',
  {
    variants: {
      size: {
        xs: 'size-4',
        sm: 'size-6',
        md: 'size-8',
        lg: 'size-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export type SpinnerSize = NonNullable<VariantProps<typeof spinnerStyles>['size']>;

@Component({
  selector: 'ui-spinner',
  templateUrl: './spinner.html',
})
export class Spinner {
  public readonly size = input<SpinnerSize>();
  public readonly loadingText = input('Loading');
  public readonly twClasses = computed(() => buildClasses(spinnerStyles({ size: this.size() })));
  public readonly announcedText = computed(() => this.loadingText().trim());
}
