import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(FormsModule),
    ...(config.providers || [])
  ]
});

export default bootstrap;
