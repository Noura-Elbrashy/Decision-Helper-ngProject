import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HomeComponent } from './app/app.component';

bootstrapApplication(HomeComponent, appConfig)
  .catch((err) => console.error(err));
