import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
        // onViewTransitionCreated(transitionInfo) {
        //   console.log(transitionInfo);

        // }
      })),
    // AGREGAR PARA HACER PETICIONES HTTP
    importProvidersFrom(
      OAuthModule.forRoot(),
      HttpClientModule,

    )

  ]
};
