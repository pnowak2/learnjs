import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { TODO_PROVIDERS } from './providers/todo.providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    ...TODO_PROVIDERS,
  ],
};
