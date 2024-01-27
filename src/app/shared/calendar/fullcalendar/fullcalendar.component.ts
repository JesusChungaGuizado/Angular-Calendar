import { Component, signal, ChangeDetectorRef, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';

import { ModalComponent } from '../../../components/modal/modal.component';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';

import { AuthGoogleService } from '../../../services/google/auth/auth-google.service';
import { ApiCalendarService } from '../../../services/google/api-calendar/api-calendar.service';

import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-fullcalendar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule, ModalComponent, CalendarFormComponent],
  templateUrl: './fullcalendar.component.html',
  styleUrl: './fullcalendar.component.css'
})
export default class FullcalendarComponent implements OnInit {


  private idReunion = uuidv4();
  calendars: any[] = [];
  calendarEvents: any[] = [];
  evento = {};
  message: string = "";
  stateBtn: string = "";
  stadoBtn() {
    this.stateBtn = "true";
  }

  authService = inject(AuthGoogleService);
  calendarService = inject(ApiCalendarService);

  calendarVisible = signal(true);
  currentEvents = signal<EventApi[]>([]);
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    locale: esLocale,
    eventTimeFormat: {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true //formato AM/PM
    },
    // Formato de hora para las etiquetas de ranuras (slots)
    slotLabelFormat: {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, //formato AM/PMM/PM
    },
    initialView: 'dayGridMonth',
    events: this.calendarEvents,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,

    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      console.log("Autenticado");
      this.loadEvents();
    } else {
      console.log("No esta autenticado");

    }
  }
  constructor(private changeDetector: ChangeDetectorRef) {
  }

  // Eventos delo calendario Full Calendar
  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool)
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    console.log(calendarApi);

    calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }

  }

  handleEventClick(clickInfo: EventClickArg) {
    const idEvento = clickInfo.event.id;
    const CalendarId = "primary"
    // console.log(clickInfo.event);
    // console.log("ID", clickInfo.event.id);
    // console.log("Titulo", clickInfo.event.title);
    // console.log("Fecha y hora inicio", clickInfo.event.startStr);
    // console.log("Fecha y hora Fin", clickInfo.event.endStr);
    this.getEvento(idEvento, CalendarId)


  }


  //Eventos para comunicarse con la api de google calendar

  getEvento(idEvento: string, CalendarId: string = "primary") {
    this.calendarService.getEventById(idEvento, CalendarId).subscribe((event) => {
      this.evento = event;
    })
  }
  loadCalendars() {
    this.calendarService.getCalendarsList().subscribe((calendars) => {
      this.calendars = calendars.items;
      console.log(calendars);

    });
  }
  loadEvents(calendarId: string = "primary") {
    this.calendarService.getCalendarEvents(calendarId).subscribe((events) => {
      const eventos = events.items.filter((event: any) => event.status === 'confirmed');
      this.calendarEvents = eventos.map((event: any) => ({
        id: event.id,
        title: event.summary,
        start: event.start.dateTime,
        end: event.end.dateTime,
        editable: false
      }));
      this.calendarOptions.events = this.calendarEvents;
      // console.log("Eventos de formato", this.calendarOptions.events);
    });
  }
  createEvent(event: any) {

    console.log(event.conferenceData.createRequest.requestId)
    // console.log(this.aleatorio())
    this.calendarService.createEvent("primary", event).subscribe(
      (result) => {
        // Manejar el caso de éxito
        if (result.success) {
          console.log('Éxito:', result.data);
          this.message = result.message;
          // Hacer algo con el valor del response (result.data)
          this.loadEvents();
        } else {
          console.error('Error:', result.error);
          // Manejar el error (result.error)
        }
      }
    );

  }
  updateEvent(event: any) {
    this.calendarService.updateEvent(event.id, event, "primary").subscribe(
      (result) => {
        // Manejar el caso de éxito
        if (result.success) {
          console.log('Éxito:', result.data);
          this.message = result.message;
          // Hacer algo con el valor del response (result.data)
          this.loadEvents();
        } else {
          console.error('Error:', result.error);
          // Manejar el error (result.error)
        }
      }
    );
  }

  deleteEvent(idEvento: string, CalendarId: string = "primary") {
    this.calendarService.deleteEventById(idEvento, CalendarId).subscribe(
      (response) => {
        console.log('Evento eliminado exitosamente:', response);
        this.message = "Evento eliminado exitosamente";
        this.loadEvents();
      },
      (error) => {
        this.message = "Hubo un error intentalo mas tarde"
        console.error('Error al eliminar el evento:', error);
        // Manejar errores aqu
      })
  }

}
