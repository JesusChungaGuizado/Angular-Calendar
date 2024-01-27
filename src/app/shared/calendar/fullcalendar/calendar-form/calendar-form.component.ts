import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-calendar-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calendar-form.component.html',
  styleUrl: './calendar-form.component.css',
  providers: [DatePipe]
})
export class CalendarFormComponent implements OnChanges {
  @Output() submitUpdate = new EventEmitter();
  @Output() submitRegister = new EventEmitter();
  @Output() submitDelete = new EventEmitter();
  @Input({ required: true }) labelBoton: string = "";
  @Input() evento: any = {};
  @Input() message: string = "";

  @Input({ required: true }) eventForm: any;  //evnto a ejecutar update o register
  private idReunion = uuidv4();   //Generando id aleatorio para el meet

  formBuilder = inject(FormBuilder); // Inicializando el formBuilder
  datePipe = inject(DatePipe); // Inicializando el formBuilder


  public calendarForm = this.formBuilder.group({
    searchTerm: [''],
    id: [''],
    summary: ['', Validators.required],
    location: ['Microsol San Isidro 254'],
    description: ['', Validators.required],
    start: this.formBuilder.group({
      dateTime: ['', Validators.required],
      timeZone: "America/Lima"
    }),
    end: this.formBuilder.group({
      dateTime: ['', Validators.required],
      timeZone: "America/Lima"
    }),
    attendees: [[], Validators.required],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', 'minutes': 24 * 60 },
        { method: 'popup', 'minutes': 10 }
      ]
    },
    conferenceData: {
      createRequest: {
        requestId: this.idReunion
      },
      conferenceDataVersion: 1
    }
  }
  )


  ngOnChanges(changes: SimpleChanges) {
    if (changes["evento"]) {
      console.log(this.evento);
      this.message = ""
      this.usuariosSeleccionados = this.evento.attendees;
    }

    if (changes["message"]) {
      console.log("cambio mensaje", changes["message"]);
      // setTimeout(() => {
      //   this.message = ""
      // }, 3000);

      // this.usuariosSeleccionados = this.evento.attendees
    }



    if (changes["evento"] && this.evento) {
      this.message = "";
      this.calendarForm.patchValue({
        id: this.evento.id,
        summary: this.evento.summary,
        // 'location': '800 Howard St., San Francisco, CA 94103',
        description: this.evento.description,
        start: {
          dateTime: this.formatoFecha(this.evento.start?.dateTime),
          timeZone: "America/Lima"
        },
        end: {
          dateTime: this.formatoFecha(this.evento.end?.dateTime),
          timeZone: "America/Lima"
        },
        attendees: this.usuariosSeleccionados
      });
    }
  }

  formatoFecha(fecha: any) {
    // Formatea la fecha y hora en el formato requerido (YYYY-MM-DDTHH:mm:ss)
    return this.datePipe.transform(fecha, 'yyyy-MM-ddTHH:mm:ss');
  }

  dataEventUpdate() {
    const startDateTime = this.formatoFecha(this.calendarForm.controls.start.controls.dateTime.value);
    const endDateTime = this.formatoFecha(this.calendarForm.controls.end.controls.dateTime.value);
    return {
      ...this.evento,
      ...this.calendarForm.value,
      start: {
        dateTime: startDateTime,
        timeZone: "America/Lima"
      },
      end: {
        dateTime: endDateTime,
        timeZone: "America/Lima",
      }
    };
  }
  dataEventRegister() {
    const startDateTime = this.formatoFecha(this.calendarForm.controls.start.controls.dateTime.value);
    const endDateTime = this.formatoFecha(this.calendarForm.controls.end.controls.dateTime.value);
    return {
      ...this.calendarForm.value,
      start: {
        dateTime: startDateTime,
        timeZone: "America/Lima"
      },
      end: {
        dateTime: endDateTime,
        timeZone: "America/Lima",
      },
    };
  }
  handleSubmitForm() {
    if (this.calendarForm.valid) {
      if (this.eventForm === "register") {
        console.log("datos para registrar:", this.dataEventRegister());
        this.submitRegister.emit(this.dataEventRegister());


      }
      if (this.eventForm === "update") {
        console.log("datos para actulizar:", this.dataEventUpdate());
        this.submitUpdate.emit(this.dataEventUpdate());
      }
    }
  }

  handleSubmitDelete() {
    console.log("datos para elminar:", this.evento.id);
    this.submitDelete.emit(this.evento.id);


  }

  searchTerm: any = this.calendarForm.controls.searchTerm;
  usuariosSeleccionados: any = [];
  usuariosEncontrados: any[] = [];


  usuarios = [
    { id: 1, email: 'jesus@gmail.com' },
    { id: 2, email: 'carlos@gmail.com' },
    { id: 3, email: 'zambrano@gmail.com' },
    { id: 4, email: 'juan@gmail.com' },
    // ... otros usuarios
  ];
  buscarUsuarios() {
    if (this.searchTerm.value !== "" || null) {
      this.usuariosEncontrados = this.usuarios.filter(usuario =>
        usuario.email.toLowerCase().includes(this.searchTerm.value.toLowerCase())
      );
    }
  }

  seleccionarUsuario(usuario: any) {
    const usuarioExistente = this.usuariosSeleccionados.find((user: any) => user.email === usuario.email);
    if (!usuarioExistente) {
      this.usuariosSeleccionados.push(usuario);
      this.calendarForm.controls.attendees.setValue(this.usuariosSeleccionados)

    }
    this.calendarForm.controls.searchTerm.setValue(""); // Limpiar el término de búsqueda después de seleccionar
    this.usuariosEncontrados = []; // Limpiar la lista de usuarios encontrados
  }

  deseleccionarUsuario(usuario: any) {
    this.usuariosSeleccionados = this.usuariosSeleccionados.filter((u: any) => u.email !== usuario.email);
    this.calendarForm.controls.attendees.setValue(this.usuariosSeleccionados)
    console.log(this.usuariosSeleccionados);
  }
}
