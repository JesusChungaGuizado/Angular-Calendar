import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../../services/state/state.service';
import { UserService } from '../../../services/user/user.service';
import { User, UserRegister } from '../../../interfaces/user';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../../../components/modal/modal.component';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent, UserFormComponent],
  templateUrl: './users.component.html'
})
export default class UsersComponent {
  public users: User[] = [];
  public user = {};
  public message = "";

  stateService = inject(StateService);
  userService = inject(UserService);

  ngOnInit(): void {
    this.listUsers();
  }

  public listUsers() {
    this.userService.list().subscribe({
      next: (data: User[]) => {
        this.users = data;
        console.log(data);

      },
      error: (error: any) => {
        console.error("Error user:", error);

      }
    })
  }
  public registerUser(usuario: any) {
    this.userService.store(usuario).subscribe({
      next: (data: any) => {
        this.message = data.message;
        console.log(data);

      },
      error: (error: any) => {
        console.error("Error user:", error);

      }
    })
    this.listUsers()
  }

  public updateUser(usuario: any) {
    this.userService.update(usuario, usuario.id).subscribe({
      next: (data: any) => {
        this.message = data.message;
        console.log(data);

      },
      error: (error: any) => {
        console.error("Error user:", error);

      }
    })
    this.listUsers()
  }

  public getUser(id: number) {
    this.userService.show(id).subscribe({
      next: (data: any) => {
        this.user = data.user;
        console.log(data);

      },
      error: (error: any) => {
        console.error("Error user:", error);

      }
    })
  }

  public deleteUser(id: number) {
    this.userService.delete(id).subscribe({
      next: (data: any) => {
        this.message = data.message;
        console.log(data);

      },
      error: (error: any) => {
        console.log("Error delete:", error);

      }
    })
    this.listUsers();
  }

  public closeModal() {
    this.user = {};
  }
  // getUsers(){
  //   return this.userService.users
  // }
  // getUsers() {
  //   this.userService.store().subscribe({
  //     next: (data: User[]) => {
  //       this.users = data;
  //       console.log(data);

  //     },
  //     error: (error: any) => {
  //       console.error("Error user:", error);

  //     }
  //   })
  // }
}
