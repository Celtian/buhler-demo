import { makeEnvironmentProviders } from '@angular/core';
import { TitleStrategy } from '@angular/router';

import { CustomTitleStrategy } from '../services/custom-title-strategy';

export const provideTitle = () => {
  return makeEnvironmentProviders([
    {
      provide: TitleStrategy,
      useClass: CustomTitleStrategy,
    },
  ]);
};
