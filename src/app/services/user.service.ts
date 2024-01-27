import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private apiUrl = 'http://localhost:8000/api/';
  private apiUrl = 'https://fakestoreapi.com'


  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<any> {
    const url = `${this.apiUrl}/products`;
    return this.httpClient.get(url);
  }
}
