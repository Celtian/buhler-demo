# Ui

The shared Angular UI library lives in the `buhler-demo` workspace. Follow the
[root README](../../README.md) for Node.js, Bun, and dependency
installation. Run all commands below from the repository root unless noted.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
bun run ng generate component component-name --project ui
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
bun run ng generate --help
```

## Building

To build the library, run:

```bash
bun run build ui
```

This command builds the library in production mode and writes the package to `dist/ui`.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:

   ```bash
   cd dist/ui
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
bun run test ui --watch=false
```

## Running end-to-end tests

No end-to-end testing target is configured for this library.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Tooltip

Import `Tooltip` from the UI public API (`@/ui` in this workspace) into the standalone component using it:

```ts
import { Component } from '@angular/core';

import { Tooltip } from '@/ui';

@Component({
  imports: [Tooltip],
  template: `
    <button
      type="button"
      uiTooltip="Save your changes"
      [tooltipPosition]="['bottomCenter', 'topCenter']"
    >
      Save
    </button>
  `,
})
export class SaveButton {}
```

`tooltipPosition` is required. Positions are tried in order: `topRight`,
`topLeft`, `topCenter`, `bottomRight`, `bottomLeft`, `bottomCenter`, `right`,
and `left`. The arrow follows the position selected by the CDK overlay.

`uiTooltip` accepts text, a `TemplateRef<void>`, a component class, or
`{ component: MyTooltipContent, inputs: { label: 'Details' } }`. Empty text
hides the tooltip. Use `[tooltipPadding]="false"` for content that provides
its own spacing. Templates and components should contain noninteractive
information; use a popover or dialog for links, buttons, or other controls.

```html
<button type="button" [uiTooltip]="details" [tooltipPosition]="['right', 'left']">Details</button>
<ng-template #details><strong>Additional information</strong></ng-template>
```

Optionally configure defaults in application providers:

```ts
import { provideTooltip } from '@/ui';

// Defaults: arrow: true, maxWidth: '12rem'. Numbers represent pixels.
provideTooltip({ arrow: false, maxWidth: 240 });
```

Maximum width applies only to text; templates and components control their
own dimensions. Tooltips appear on hover or keyboard focus, remain open while
hovering their content, and close on Escape, click, scroll, or leaving both
the trigger and content. They preserve existing `aria-describedby` references
and never move focus. Provide a focusable trigger when keyboard access is needed.

Include the shared UI stylesheet (`projects/ui/src/css/styles.css` in this
workspace). It supplies theme tokens, Tailwind utilities, and the required CDK
overlay styles. The portal already imports it.

## Spinner

Import `Spinner` from `@/ui` into the consuming component's `imports`:

```ts
import { Component } from '@angular/core';

import { Spinner } from '@/ui';

@Component({
  imports: [Spinner],
  template: `<ui-spinner size="sm" loadingText="Loading machines" />`,
})
export class LoadingMachines {}
```

Sizes are `xs` (16px), `sm` (24px), `md` (32px, default), and `lg`
(40px). `loadingText` defaults to `Loading` and is trimmed for screen readers.
The spinner announces a polite loading status and respects reduced motion.
Include the shared UI stylesheet for its colors, sizes, and animation.
