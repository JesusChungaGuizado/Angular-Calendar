import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthGoogleService } from '../auth/auth-google.service';
import { Observable } from 'rxjs';

declare const gapi: any;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class ApiGoogleCalendarService {
  private CLIENT_ID = '797970488214-l3oqi3dcgqgjfav2n830q5c7s8qe0ha1.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyCRcQfI-6tKVkHnDKMJViAAiyXfemw8Ur0';
  private DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  private SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

  private tokenClient: any;
  private gapiInited = false;
  private gisInited = false;

  constructor() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: '', // Definido más adelante
    });
    this.initClient();
  }

  initClient() {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: this.API_KEY,
        discoveryDocs: [this.DISCOVERY_DOC],
      }).then(() => {
        this.gapiInited = true;
        this.maybeEnableButtons();
      });
    });
  }

  gapiLoaded() {
    this.gapiInited = true;
    this.maybeEnableButtons();
  }

  gisLoaded() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: '', // Definido más adelante
    });
    this.gisInited = true;
    this.maybeEnableButtons();
  }
  ///dcvhdbhbh
  maybeEnableButtons() {
    if (this.gapiInited && this.gisInited) {
      // Puedes activar los botones aquí si es necesario
    }
  }

  handleAuthClick() {
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw (resp);
      }
      // Puedes realizar acciones después de la autenticación aquí
      await this.listUpcomingEvents();
    };
    console.log(gapi.client.getToken());

    if (gapi.client.getToken() === null) {
      this.tokenClient.requestAccessToken({ prompt: 'consent' });


    } else {
      this.tokenClient.requestAccessToken({ prompt: '' });
    }
  }

  handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      // Puedes realizar acciones después del cierre de sesión aquí
    }
  }

  async listUpcomingEvents() {
    let response;
    try {
      const request = {
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime',
      };
      response = await gapi.client.calendar.events.list(request);
    } catch (err) {
      // Manejar errores aquí
      return;
    }

    const events = response.result.items;
    if (!events || events.length == 0) {
      // Manejar caso en el que no hay eventos
      return;
    }
    // Puedes hacer algo con los eventos aquí
  }
  // getCalendarsList(): Observable<any> {
  //   const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList`;
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  //   return this.httpClient.get(url, { headers });
  // }

  // getCalendarEvents(calendarId: string = "primary"): Observable<any> {
  //   const url = `${this.calendarApiUrl}/${calendarId}/events`;
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authGoogleService.getTokenId()}`);
  //   return this.httpClient.get(url, { headers });
  // }

  // createEvent(calendarId: string = "primary", event: any): Observable<any> {
  //   const url = `${this.calendarApiUrl}/${calendarId}/events`;
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authGoogleService.getTokenId()}`);
  //   return this.httpClient.post(url, event, { headers });
  // }





}
