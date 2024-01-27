import { Component, ViewChild, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
// import { CalendarView } from './calendar-view/calendar-view.component.enum';
import localeEs from '@angular/common/locales/es';


// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  providers: [DatePipe]
})
export default class CalendarComponent implements OnInit {
  // CalendarView = CalendarView
  weeks: number[][] = [];
  currentMonth: Date = new Date();
  // selectedView: CalendarView = CalendarView.Month;
  selectedDate: any;
  events: any[] = [  // Supongamos que tienes un array de eventos
    {
      "title": "Reunión 1",
      "start": "2023-12-09T10:00:00",
      "end": "2023-12-09T12:00:00",
      "allDay": false,
      "editable": true,
      "color": "black",
      "backgroundColor": "#6aa84f",
      "borderColor": "#3c6e47",
      "textColor": "#ffffff",
      "url": "https://ejemplo.com/reunion-importante",
      "participants": [
        {
          "name": "Juan Pérez",
          "email": "juan@example.com"
        },
        {
          "name": "Ana Gómez",
          "email": "ana@example.com"
        }
      ]
    },
    {
      "title": "Reunión 2",
      "start": "2023-12-10T08:08:00",
      "end": "2023-12-10T13:00:00",
      "allDay": false,
      "editable": true,
      "color": "#378006",
      "backgroundColor": "#6aa84f",
      "borderColor": "#3c6e47",
      "textColor": "#ffffff",
      "url": "https://ejemplo.com/reunion-importante",
      "participants": [
        {
          "name": "Juan Pérez",
          "email": "juan@example.com"
        },
        {
          "name": "Ana Gómez",
          "email": "ana@example.com"
        }
      ]
    },
    {
      "title": "Prueba 2",
      "start": "2023-12-10T10:00:00",
      "end": "2023-12-11T12:00:00",
      "allDay": false,
      "editable": true,
      "color": "blue",
      "backgroundColor": "#6aa84f",
      "borderColor": "#3c6e47",
      "textColor": "#ffffff",
      "url": "https://ejemplo.com/reunion-importante",
      "participants": [
        {
          "name": "Juan Pérez",
          "email": "juan@example.com"
        },
        {
          "name": "Ana Gómez",
          "email": "ana@example.com"
        }
      ]
    },
    {
      "title": "Prueba  Jesus",
      "start": "2023-12-10T10:30:00",
      "end": "2023-12-11T12:15:00",
      "allDay": false,
      "editable": true,
      "color": "red",
      "backgroundColor": "#6aa84f",
      "borderColor": "#3c6e47",
      "textColor": "#ffffff",
      "url": "https://ejemplo.com/reunion-importante",
      "participants": [
        {
          "name": "Juan Pérez",
          "email": "juan@example.com"
        },
        {
          "name": "Ana Gómez",
          "email": "ana@example.com"
        }
      ]
    },
  ];
  ngOnInit() {
    this.generateCalendar();
  }
  constructor(private datePipe: DatePipe) {
    registerLocaleData(localeEs, 'es'); // Registra la información regional para español
  }
  generateCalendar() {
    const firstDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);

    let currentDay = 1;
    let currentWeek: number[] = [];

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      currentWeek.push(0);
    }

    for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
      currentWeek.push(i);

      if (currentWeek.length === 7) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    while (currentWeek.length < 7) {
      currentWeek.push(0);
    }

    this.weeks.push(currentWeek);

  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.resetCalendar();
  }

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.resetCalendar();
  }

  resetCalendar() {
    this.weeks = [];
    this.generateCalendar();
  }

  goToToday() {
    this.currentMonth = new Date();
    this.resetCalendar();
  }

  // changeView(view: CalendarView) {
  //   this.selectedView = view;
  //   this.resetCalendar();
  // }

  //Vista por SEMANA /WEEK

  getWeekDays(): Date[] {
    const weekDays: Date[] = [];
    const currentDate = new Date(this.currentMonth);
    currentDate.setDate(currentDate.getDate() - currentDate.getDay()); // Ir al primer día de la semana

    for (let i = 0; i < 7; i++) {
      weekDays.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return weekDays;
  }

  getHours(): string[] {
    const hours: string[] = [];
    for (let i = 0; i < 24; i++) {
      const formattedHour = ('0' + i).slice(-2) + ':00'; // Formatear la hora
      hours.push(formattedHour);
    }
    return hours;
  }

  getWeekEvents(day: Date, hour: string, dayIndex: number): any[] {
    const startOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());
    const endOfDay = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);

    return this.events.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);

      // Filtrar eventos que están dentro del día y la hora específicos
      return (
        (eventStart <= new Date(day.getFullYear(), day.getMonth(), day.getDate(), parseInt(hour) + 1)) &&
        (eventEnd >= new Date(day.getFullYear(), day.getMonth(), day.getDate(), parseInt(hour)))
      ) ||
        (
          (eventStart >= startOfDay && eventStart < endOfDay) &&
          (eventEnd >= startOfDay && eventEnd <= endOfDay)
        );
    }).map(event => {
      // Ajustar el estilo "top" del evento para posicionarlo en la fila correcta
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      const eventTop = (eventStart.getHours() * 60 + eventStart.getMinutes()) / 60;

      return {
        ...event,
        top: eventTop
      };
    });
  }

  handlesWeekEventClick(event: any) {
    console.log('Evento clickeado:', event);

    // Puedes hacer lo que desees con el evento, como obtener la fecha completa
    // event.fecha contendrá la fecha del evento

    // Puedes almacenar la fecha actual en una propiedad del componente
    this.selectedDate = event.fecha;
  }



  // Pintando los eventos en el calendario por mes
  getMonthEvents(): any[] {
    const startOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const endOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);

    return this.events.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);

      // Filtrar eventos que están dentro del mes actual
      return (eventStart >= startOfMonth && eventStart <= endOfMonth) ||
        (eventEnd >= startOfMonth && eventEnd <= endOfMonth);
    });
  }

  handleDayClick(day: number) {
    console.log('Día clickeado:', day);

    // Aquí puedes hacer lo que desees con el día seleccionado, como obtener la fecha completa
    const clickedDate = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day);

    // Puedes almacenar la fecha actual en una propiedad del componente
    this.selectedDate = clickedDate;
    console.log(this.selectedDate);

  }
  //valida si hay eventos en ese dia
  isEventOnDay(event: any, day: number): boolean {
    const eventStart = new Date(event.start).getDate();
    const eventEnd = new Date(event.end).getDate();

    return day >= eventStart && day <= eventEnd;
  }
  //captura el valor de los eventos
  getEventData(event: any): void {
    console.log(event)
  }
}
