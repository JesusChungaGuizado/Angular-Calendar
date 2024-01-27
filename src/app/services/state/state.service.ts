import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly STATE_KEY = 'appState';
  private initialState = {
    user: "",
    token: "",
    success: false,
    carId: ""
  };


  private stateSubject = new BehaviorSubject<any>(this.initialState);

  state$: Observable<any> = this.stateSubject.asObservable();

  constructor() {
    // Recupera el estado almacenado en el localStorage al inicio
    const storedState = localStorage.getItem(this.STATE_KEY);
    if (storedState) {
      this.stateSubject.next(JSON.parse(storedState));
    }
  }


  getState(): any {
    return this.stateSubject.getValue();
  }
  getToken(): string {
    return this.initialState.token;
  }
  updateState(newState: any): void {
    const currentState = this.stateSubject.getValue();
    const updatedState = { ...currentState, ...newState };
    this.stateSubject.next(updatedState);

    // Almacena el estado en el localStorage
    localStorage.setItem(this.STATE_KEY, JSON.stringify(updatedState));
  }
  deleteState(): void {
    localStorage.removeItem(this.STATE_KEY);
    this.stateSubject.next(this.initialState);
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
