# Ui

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.0.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build ui
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

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
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

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
