import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login-service.service';
import { UserLogin } from '../interfaces/userLogin';
import { StateService } from '../services/state/state.service';
import { AuthGoogleService } from '../services/google/auth/auth-google.service';
import { ApiGoogleCalendarService } from '../services/google/api-googleCalendar/api-googlecalendar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent implements OnInit {
  public users?: any[];
  public state: any;
  public loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ]
    ],
    password: ['', [
      Validators.required,
      Validators.pattern(/.{6,}/)]
    ]
  })
  products: any[] = [];
  UserService = inject(UserService);
  LoginService = inject(LoginService);
  stateService = inject(StateService);


  constructor(private fb: FormBuilder, private AuthGoogleService: AuthGoogleService) { }
  // private UserService: UserService
  // private loginService: LoginService
  ngOnInit(): void {
    this.getProducts();
    console.log(this.products);
    this.stateService.state$.subscribe((newState) => {
      this.state = newState;
    });

    // Obtiene el estado inicial
    this.state = this.stateService.getState();
    console.log(this.state);

  }

  getProducts() {
    this.UserService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        console.log('Productos:', this.products);
      },
      error: (error: any) => {
        console.error('Error obteniendo productos:', error)
      },
    });
  }
  LogIn() {
    const user: UserLogin = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
      // Otras propiedades de UserLogin si las hay
    };
    this.LoginService.login(user).subscribe({
      next: (data: any) => {
        console.log('Login:', data);
        this.stateService.updateState(
          {
            carId: data.carId,
            token: data.token.key,
            user: data.user,
            success: data.success
          }
        );
      },
      error: (error: any) => {
        console.error('Error login:', error)
      },
    })
  }
  logOut() {
    this.stateService.deleteState();
  }

  loginWithGoogle() {
    this.AuthGoogleService.login();
  }

  submit() {
    // console.log(this.loginForm)

    this.LogIn();
  }

}
