# BuhlerDemo

The `/overview` page displays the Bühler bagging line in a machine navigation strip and a
connected overview. Select a machine in either view to highlight it in both; selection does
not change its running, alarm, or warning state. On small screens the line stacks vertically.

Machine configuration and initial states are loaded from
`projects/portal/public/data/machines.json` and `machine-states.json`. Machines are sorted by
`order` and joined to states by `stateId`. These are static fixtures, not live telemetry.
The header clock uses the browser's local time. Google Material icons are bundled locally,
with their Apache license in `projects/portal/public/icons/`.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

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

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

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
