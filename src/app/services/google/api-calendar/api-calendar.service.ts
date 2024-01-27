import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthGoogleService } from '../auth/auth-google.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiCalendarService {
  private calendarApiUrl = 'https://www.googleapis.com/calendar/v3/calendars';
  httpClient = inject(HttpClient);
  authGoogleService = inject(AuthGoogleService);
  tokenAcceso = this.authGoogleService.getTokenAccess();

  constructor() {
    // console.log(this.authGoogleService.getTokenId());
    // this.token = this.authGoogleService.getTokenId();
    // console.log(this.token);
    console.log(this.authGoogleService.getTokenAccess());
  }

  getCalendarsList(): Observable<any> {
    const url = `https://www.googleapis.com/calendar/v3/users/me/calendarList`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authGoogleService.getTokenAccess()}`);
    return this.httpClient.get(url, { headers });
  }
  // Se le pasa el id del calendario
  getCalendarEvents(calendarId: string = "primary"): Observable<any> {
    const url = `${this.calendarApiUrl}/${calendarId}/events`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authGoogleService.getTokenAccess()}`);
    return this.httpClient.get(url, { headers });
  }

  createEvent(calendarId: string = "primary", event: any): Observable<any> {
    const url = `${this.calendarApiUrl}/${calendarId}/events?conferenceDataVersion=1`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authGoogleService.getTokenAccess()}`);
    return this.httpClient.post(url, event, { headers }).pipe(
      map((response) => {
        return { success: true, data: response, message: "Evento creado exitosamente" }; // Retorno exitoso
      }),
      catchError((error) => {
        console.error('Error al crear el evento:', error);
        return of({ success: false, error: 'Hubo un error, inténtalo más tarde' });
      })
    );
  }

  updateEvent(idEvento: string, event: any, calendarId: string = "primary"): Observable<any> {
    const url = `${this.calendarApiUrl}/${calendarId}/events/${idEvento}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authGoogleService.getTokenAccess()}`);
    return this.httpClient.put(url, event, { headers }).pipe(
      map((response) => {
        return { success: true, data: response, message: "Evento actulizado exitosamente" }; // Retorno exitoso
      }),
      catchError((error) => {
        console.error('Error al actulizar el evento:', error);
        return of({ success: false, error: 'Hubo un error, inténtalo más tarde' });
      })
    );
  }
  getEventById(idEvento: string, calendarId: string = "primary"): Observable<any> {
    const url = `${this.calendarApiUrl}/${calendarId}/events/${idEvento}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authGoogleService.getTokenAccess()}`);
    return this.httpClient.get(url, { headers });
  }
  deleteEventById(idEvento: string, calendarId: string = "primary"): Observable<any> {
    const url = `${this.calendarApiUrl}/${calendarId}/events/${idEvento}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authGoogleService.getTokenAccess()}`);
    return this.httpClient.delete(url, { headers });
  }








  // getCalendarEvents(calendarId: string): Promise<any> {
  //   const token = this.authGoogleService.getTokenId();

  //   if (!token) {
  //     // Manejar la lógica para el caso en que no haya un token de autenticación
  //     return Promise.reject('Token de autenticación no disponible');
  //   }

  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };

  //   const url = `${this.calendarApiUrl}/${calendarId}/events`;

  //   return this.httpClient.get(url, { headers }).toPromise();
  // }
}
