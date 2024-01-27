import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiCalendarService } from '../../../services/google/api-calendar/api-calendar.service';
import { AuthGoogleService } from '../../../services/google/auth/auth-google.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html'
})
export default class UserComponent {
  calendars: any[] = [];
  calendarEvents: any[] = [];
  authService = inject(AuthGoogleService);
  calendarService = inject(ApiCalendarService);

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      console.log("Autenticado");


    }
  }

  loadCalendars() {
    this.calendarService.getCalendarsList().subscribe((calendars) => {
      this.calendars = calendars.items;
      console.log(calendars);

    });
  }

  loadEvents(calendarId: string = "primary") {
    this.calendarService.getCalendarEvents(calendarId).subscribe((events) => {
      this.calendarEvents = events.items.filter((event: any) => event.status === 'confirmed');
      console.log(this.calendarEvents);
    });
  }
  getEventId(id = "2gq7raoq71f08rcj6aauo5eegb", calendarId: string = "jesusalbertochungaguizado@gmail.com") {
    this.calendarService.getEventById(id, calendarId).subscribe((event) => {
      console.log(event);
    })
  }
  destroyEventById(id = "2gq7raoq71f08rcj6aauo5eegb", calendarId: string = "jesusalbertochungaguizado@gmail.com") {
    this.calendarService.deleteEventById(id, calendarId).subscribe(
      (response) => {
        console.log('Evento eliminado exitosamente:', response);
        // Puedes realizar acciones adicionales después de crear el evento.
      },
      (error) => {
        console.error('Error al eliminar el evento:', error);
        // Manejar errores aqu
      }
    )

  }

  selectedCalendar: any;
  newEvent: any = {
    summary: '',
    description: '',
    start: { dateTime: '' },
    end: { dateTime: '' },
  };

  selectCalendar(calendar: any) {
    this.selectedCalendar = calendar;
    this.newEvent = {
      summary: '',
      description: '',
      start: { dateTime: '' },
      end: { dateTime: '' },
    };
  }
  private idReunion = uuidv4();
  aleatorio() {
    const min = 1;
    const max = 10000;
    const numeroAleatorioEnRango = Math.floor(Math.random() * (max - min + 1)) + min;
    return numeroAleatorioEnRango.toString();
  }

  private event = {
    'summary': 'Prueba 24 Año nuevo',
    // 'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
      'dateTime': "2024-01-01T08:02:00",
      'timeZone': "America/Lima"
    },
    'end': {
      'dateTime': "2024-01-01T10:02:00",
      'timeZone': "America/Lima"
    },
    'attendees': [
      { 'email': 'jesusalbertochungaguizado@gmail.com' },
      { 'email': 'lpage@example.com' },
      { 'email': 'sbrin@example.com' }
    ],
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'email', 'minutes': 24 * 60 },
        { 'method': 'popup', 'minutes': 10 }
      ]
    },

    'conferenceData': {
      'createRequest': {
        'requestId': this.idReunion
      },
      'conferenceDataVersion': 1
    }
  };



  createEvent() {
    // if (!this.selectedCalendar) {
    //   console.error('Seleccione un calendario antes de crear un evento.');
    //   return;
    // }
    console.log(this.event.conferenceData.createRequest.requestId)
    // console.log(this.aleatorio())
    this.calendarService.createEvent("primary", this.event).subscribe(
      (response) => {
        console.log('Evento creado exitosamente:', response);
      },
      (error) => {
        console.error('Error al crear el evento:', error);
        // Manejar errores aqu
      }
    );
  }
  updateEvent(id = "3uu126or6hs9qs4pi54tlrbq0k") {
    // if (!this.selectedCalendar) {
    //   console.error('Seleccione un calendario antes de crear un evento.');
    //   return;
    // }
    const event = {
      'summary': 'EDITADO Fiesta AÑO NUEVO',
      'location': 'Santa ANITA3',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2023-12-30T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': '2023-12-30T13:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      'attendees': [
        { 'email': 'lpage@example.com' },
        { 'email': 'sbrin@example.com' }
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          { 'method': 'email', 'minutes': 24 * 60 },
          { 'method': 'popup', 'minutes': 10 }
        ]
      },

    };

    this.calendarService.updateEvent(id, event, "primary").subscribe(
      (response) => {
        console.log('Evento actulizado exitosamente:', response);
        // Puedes realizar acciones adicionales después de crear el evento.
      },
      (error) => {
        console.error('Error al actulizar el evento:', error);
        // Manejar errores aqu
      }
    );
  }

}
