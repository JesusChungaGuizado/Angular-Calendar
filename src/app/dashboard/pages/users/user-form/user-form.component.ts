import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnChanges {
  @Output() submitUpdate = new EventEmitter<void>();
  @Output() submitRegister = new EventEmitter();
  @Input() user: any;
  @Input({ required: true }) eventForm: any;

  public userForm = this.fb.group({
    name: ['', Validators.required],
    last_name: ['', Validators.required],
    dni: ['', Validators.required],
    // address: ['', Validators.required],
    // cel_phone: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ]
    ],
    cel_phone: ["995535996", Validators.required],
    address: ["Santa Anita", Validators.required],
    password: ["10101010", Validators.required],
    // password: ['', [
    //   Validators.required,
    //   Validators.pattern(/.{6,}/)]
    // ],
    // image: ['']
  })
  constructor(private fb: FormBuilder) {
  }

  // Capturando cambios del formulario
  ngOnChanges(changes: SimpleChanges) {
    if (changes && this.user) {
      this.userForm.patchValue({
        name: this.user.name,
        last_name: this.user.last_name,
        dni: this.user.dni,
        email: this.user.email
      });
    }
  }

  dataUserUpdate() {
    return { ...this.user, ...this.userForm.value };
  }
  dataUserRegister() {
    return { ...this.userForm.value };
  }
  handleSubmitForm() {
    console.log(this.userForm.value);
    if (this.userForm.valid) {
      if (this.eventForm = "register") {
        this.submitRegister.emit(this.userForm.value);
      }
      if (this.eventForm = "update") {
        this.submitUpdate.emit(this.dataUserUpdate());
      }
    }

  }

}
