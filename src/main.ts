import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './app/config';
import { enableProdMode } from '@angular/core';
import 'zone.js'; // hack for StackBlitz

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

if (environment.production) {
  enableProdMode();
}