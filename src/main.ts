import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // bootstrapApplication(AppComponent, {
  //   providers: [
  //     importProvidersFrom(HttpClientModule),
  //     provideRouter(routes)
  //   ]
  // });
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideRouter(routes)
    ]
  });