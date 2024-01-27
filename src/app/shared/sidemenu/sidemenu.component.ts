import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';
import { Router, RouterModule } from '@angular/router';
import { AuthGoogleService } from '../../services/google/auth/auth-google.service';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent {

  public menuItems = routes.map((route) => (
    route.children ?? []
  )).flat().filter(route => route && route.path).filter(route => !route.path?.includes(':'));

  constructor(private authGoogleService: AuthGoogleService, private router: Router) {
    // const dashboardRoutes = routes.map((route) => (
    //   route.children ?? []
    // )).flat().filter(route => route && route.path).filter(route => !route.path?.includes(':'))
    // console.log(dashboardRoutes);

  }
  showData() {
    const data = this.authGoogleService.getProfiel();
    const token = this.authGoogleService.getTokenId();
    console.log({
      data,
      token
    });

  }
  logOutGoogle() {
    this.authGoogleService.logout();
    this.router.navigate(['login'])
  }

}
