import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions,
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { provideAppVersion } from 'ngx-app-version';
import { provideUpdateApp } from 'ngx-update-app';

import { VERSION_INFO } from '@/generated/version-info';
import { UpdateAppService } from '@/ui';

import { routes } from './app.routes';
import { provideTitle } from './providers/title';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideAppVersion({ version: VERSION_INFO.version }),
    provideUpdateApp({
      interval: 60_000,
      dryRun: false,
      onUpdateFactory: () => {
        const prompt = inject(UpdateAppService);
        return () => void prompt.open();
      },
    }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideTitle(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
