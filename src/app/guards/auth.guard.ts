// auth.guard.ts
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login-service.service';
import { StateService } from '../services/state/state.service';
import { AuthGoogleService } from '../services/google/auth/auth-google.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authGoogleService: AuthGoogleService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authGoogleService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['login']);
      console.log("Inicie Sesion");
      return false;
    }
  }


}