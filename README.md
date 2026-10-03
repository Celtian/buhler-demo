# 🏭 Bühler Demo

The `/overview` page displays the Bühler bagging line in a machine navigation strip and a
connected overview. Select a machine in either view to highlight it in both; selection does
not change its running, alarm, or warning state. On small screens the line stacks vertically.

Machine configuration and initial states are loaded from
`projects/portal/public/data/machines.json` and `machine-states.json`. Machines are sorted by
`order` and joined to states by `stateId`. These are static fixtures, not live telemetry.
The header clock uses the browser's local time. Google Material icons are bundled locally,
with their Apache license in `projects/portal/public/icons/`.

The workspace contains the `portal` application and the `ui` library. Angular CLI is
declared as `^22.2.1` in `package.json`; `bun.lock` records the resolved dependencies.

## 🛠️ Installation

Run the commands below from the repository root with both Node.js and Bun installed:

- Node.js: `.nvmrc` selects **26**. With nvm, run `nvm install` and `nvm use`.
  The `package.json` engine requirement is `>=24`; this is the declared minimum,
  rather than the version selected by `.nvmrc`.
- Bun: `packageManager` in `package.json` pins **1.4.2**. The declared Bun engine
  range is `>=1.4.0 <2`. Use the pinned version for consistent installs.

Bun is the configured package manager in `angular.json`, and the `postinstall`
script invokes Bun to generate `generated/version-info.ts` from package and Git
metadata. Keep the Git checkout available when installing dependencies. Node.js
is still needed to run Angular CLI; installing Bun does not replace it.

```bash
bun install --frozen-lockfile
```

## 🚀 Development server

To start a local development server, run:

```bash
bun run start portal
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## 🛠️ Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
bun run ng generate component component-name --project portal
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
bun run ng generate --help
```

## 📦 Building

Build the application and library separately:

```bash
bun run build portal
bun run build ui
```

The portal output is `dist/portal/browser`; the library output is `dist/ui`.
Both build targets default to the production configuration.

## 📱 Progressive web app

The portal includes Angular service worker support, a web app manifest, and install icons,
configured in `angular.json` and `projects/portal/ngsw-config.json`. The service worker is enabled in
production builds and disabled during development.

Build with `bun run ng build portal` and serve `dist/portal/browser` over HTTPS (or localhost)
to test installation and offline use. After the first successful load and service worker
activation, the application shell and machine JSON fixtures are available offline. Image
assets are cached when first requested. The included install icons are Angular CLI defaults.

## 🧪 Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
bun run test portal --watch=false
bun run test ui --watch=false
```

Omit `--watch=false` for interactive watch mode in a terminal. Tests use jsdom
by default; no browser is configured.

## 🧹 Lint

```bash
bun run lint
```

## 🌐 Running end-to-end tests

Neither project has an end-to-end testing target configured. Add a testing
framework and an `e2e` target before using `bun run ng e2e`.

## 📚 Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
