import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../interfaces/userLogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }
  // Ejemplo de función para obtener datos de la API.
  login(user: UserLogin): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.httpClient.post(url, user);
  }
}
