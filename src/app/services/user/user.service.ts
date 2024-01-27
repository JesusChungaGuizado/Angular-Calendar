import { Injectable, inject, signal, computed } from '@angular/core';
import { environment } from '../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from '../state/state.service';
import { User, UserRegister, UserResponse } from '../../interfaces/user';

interface State {
  users: User[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  #state = signal<State>({
    users: [],
    loading: true
  })

  #user = signal<any>({
    user: {}
  });

  public users = computed(() => this.#state().users);
  public loading = computed(() => this.#state().loading);

  private apiUrl: string = environment.apiUrl;
  private stateService = inject(StateService)
  private token: string = this.stateService.getState().token

  constructor(private httpClient: HttpClient) {
    console.log(this.token);

    // this.store();
  }

  // Servicio que trae toda la lista de usuarios
  // store() {
  //   const headers = new HttpHeaders({
  //     // Puedes ajustar el tipo de contenido según tus necesidades
  //     'Authorization': `Bearer ${this.token}`, // Agrega encabezados de autorización si es necesario

  //   });
  //   const url = `${this.apiUrl}/users`;
  //   const response = this.httpClient.get<User[]>(url, { headers }).subscribe(data => {
  //     this.#state.set({
  //       loading: false,
  //       users: data,
  //     })
  //   })
  //   return response;
  // }

  store(data: UserRegister): Observable<any> {
    const headers = new HttpHeaders({
      // Puedes ajustar el tipo de contenido según tus necesidades
      'Authorization': `Bearer ${this.token}`, // Agrega encabezados de autorización si es necesario

    });
    const url = `${this.apiUrl}/user`;
    return this.httpClient.post<any>(url, data, { headers })
  }

  update(data: UserRegister, id: number): Observable<any> {
    const headers = new HttpHeaders({
      // Puedes ajustar el tipo de contenido según tus necesidades
      'Authorization': `Bearer ${this.token}`, // Agrega encabezados de autorización si es necesario

    });
    const url = `${this.apiUrl}/user/${id}`;
    return this.httpClient.put<any>(url, data, { headers })
  }
  list(): Observable<any> {
    const headers = new HttpHeaders({
      // Puedes ajustar el tipo de contenido según tus necesidades
      'Authorization': `Bearer ${this.token}`, // Agrega encabezados de autorización si es necesario

    });
    const url = `${this.apiUrl}/users`;
    return this.httpClient.get<User[]>(url, { headers })
  }
  show(id: number): Observable<any> {
    const headers = new HttpHeaders({
      // Puedes ajustar el tipo de contenido según tus necesidades
      'Authorization': `Bearer ${this.token}`, // Agrega encabezados de autorización si es necesario

    });
    const url = `${this.apiUrl}/user/${id}`;
    return this.httpClient.get<User>(url, { headers });
  }
  delete(id: number): Observable<any> {
    const headers = new HttpHeaders({
      // Puedes ajustar el tipo de contenido según tus necesidades
      'Authorization': `Bearer ${this.token}`, // Agrega encabezados de autorización si es necesario

    });
    const url = `${this.apiUrl}/user/${id}`;
    return this.httpClient.delete(url, { headers });
  }


}
