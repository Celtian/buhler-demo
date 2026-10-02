import { Component, booleanAttribute, computed, input } from '@angular/core';

import { type VariantProps, cva } from 'class-variance-authority';

import { buildClasses } from '../helpers/tailwind';

const buttonStyles = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus',
  {
    variants: {
      size: {
        xs: 'px-2.5 py-1.5 text-xs',
        sm: 'px-3 py-2 text-sm',
        base: 'px-4 py-2.5 text-sm',
        lg: 'px-5 py-3 text-base',
        xl: 'px-6 py-3.5 text-base',
      },
      color: {
        default: 'bg-surface text-text hover:bg-neutral-300',
        danger: 'bg-danger-700 text-canvas hover:bg-danger-800',
        primary: 'bg-primary-700 text-canvas hover:bg-primary-800',
        warning: 'bg-warning-800 text-canvas hover:bg-warning-900',
        success: 'bg-success-800 text-canvas hover:bg-success-900',
        info: 'bg-info-700 text-canvas hover:bg-info-800',
      },
      disabled: {
        true: 'pointer-events-none cursor-not-allowed opacity-50',
        false: '',
      },
      active: {
        true: 'outline outline-3 outline-offset-4 outline-focus',
        false: '',
      },
      layout: {
        default: '',
        navigation:
          'relative min-h-14 min-w-[132px] gap-0 rounded-none border-0 py-3 pr-8 pl-4 text-base font-semibold hover:shadow-[inset_0_0_0_2px_currentColor] outline-offset-[-4px] focus-visible:z-20 focus-visible:outline-3 focus-visible:outline-offset-[-4px] max-[600px]:w-full max-[600px]:min-w-0 max-[600px]:pr-7 max-[600px]:pl-2 max-[600px]:text-sm',
        tile: 'relative h-[clamp(112px,14vw,144px)] w-[clamp(112px,14vw,160px)] flex-col gap-2 rounded-none border-0 p-0 text-base font-semibold hover:shadow-[inset_0_0_0_2px_currentColor] focus-visible:z-20 focus-visible:outline-3 max-[600px]:h-32 max-[600px]:w-36',
      },
      withBorder: {
        true: 'border border-neutral-600',
        false: '',
      },
      rounded: {
        none: '',
        all: 'rounded-lg',
        start: 'rounded-s-lg',
        end: 'rounded-e-lg',
      },
    },
    compoundVariants: [
      {
        layout: ['navigation', 'tile'],
        color: 'danger',
        class: 'bg-machine-alarm text-machine-foreground hover:bg-machine-alarm-hover',
      },
      {
        layout: ['navigation', 'tile'],
        color: 'warning',
        class: 'bg-machine-warning text-machine-foreground hover:bg-machine-warning-hover',
      },
      {
        layout: 'navigation',
        color: ['danger', 'warning'],
        class: 'outline-canvas focus-visible:outline-canvas',
      },
    ],
    defaultVariants: {
      size: 'base',
      color: 'default',
      disabled: false,
      active: false,
      withBorder: false,
      rounded: 'none',
      layout: 'default',
    },
  },
);

export type ButtonSize = NonNullable<VariantProps<typeof buttonStyles>['size']>;
export type ButtonColor = NonNullable<VariantProps<typeof buttonStyles>['color']>;
export type ButtonRadius = NonNullable<VariantProps<typeof buttonStyles>['rounded']>;
export type ButtonLayout = NonNullable<VariantProps<typeof buttonStyles>['layout']>;

@Component({
  selector: 'button[ui-button],a[ui-button]',
  imports: [],
  templateUrl: './button.html',
  host: {
    '[class]': 'twClasses()',
    '[attr.disabled]': 'disabled() || undefined',
  },
})
export class Button {
  public readonly size = input<ButtonSize>();
  public readonly color = input<ButtonColor>('default');
  public readonly active = input(false, { transform: booleanAttribute });
  public readonly disabled = input(false, { transform: booleanAttribute });
  public readonly withBorder = input(false, { transform: booleanAttribute });
  public readonly rounded = input<ButtonRadius>('none');
  public readonly layout = input<ButtonLayout>('default');
  public readonly twClasses = computed(() =>
    buildClasses(
      buttonStyles({
        size: this.size(),
        color: this.color(),
        disabled: this.disabled(),
        active: this.active(),
        withBorder: this.withBorder(),
        rounded: this.rounded(),
        layout: this.layout(),
      }),
    ),
  );
}
