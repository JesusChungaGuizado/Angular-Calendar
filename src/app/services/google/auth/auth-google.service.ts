import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) {
    this.initLogin();
  }
  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '258411907816-tqvnv4pr3p0ubfl0rd02v1km6q4adfoa.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/dashboard',
      scope: 'openid profile email https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly'
    }
    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();


  }

  login() {
    this.oauthService.initLoginFlow();
  }
  logout() {
    this.oauthService.logOut();
  }
  getTokenId() {
    return sessionStorage.getItem('id_token')
  }
  getTokenAccess() {
    return this.oauthService.getAccessToken();
  }
  getProfiel() {
    return this.oauthService.getIdentityClaims();
  }

  isAuthenticated(): boolean {
    return this.oauthService.hasValidIdToken();
  }


}
