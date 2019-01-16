
import {  ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {  addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { ReservationService } from '../../../services/reservation/reservation.service';
import { Reservation} from '../../../models/reservation';
import { Router } from '@angular/router';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';
import { ReservationIdBehaviorSetService } from 'src/app/services/shared/reservation-id-behavior-set.service';
import { IsAdminBehaviorSetService } from 'src/app/services/shared/is-admin-behavior-set.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent')
  modalContent: TemplateRef<any>;
  reservations: Reservation[] = [];

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = false;

  isUserAdmin = false;

  constructor(private modal: NgbModal, private reservationService: ReservationService, private router: Router,
              private reservationIdBehaviorSetService: ReservationIdBehaviorSetService,
              private isAdmin: IsAdminBehaviorSetService) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    let id: number;
    if (typeof event.id === 'string') {
      id = Number(event.id);
    } else {
      id = event.id;
    }
    this.reservationIdBehaviorSetService.changeId(id);

    this.router.navigate(['/editReservation']);

  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
    });
    this.refresh.next();
  }

  /**
   * First checks if the current user is an admin and redirects them to the admin login page if they
   * are not. If the user is an admin, all the reservations are loaded to display on the calendar
   */
  ngOnInit() {

    this.checkIfAdmin();

    this.reservationService.getAllReservations().subscribe(
        (reservations) => { this.reservations = reservations;
                            this.convertReservationsToCalendarEvent(); },
        );
  }

  /**
   * Checks if the current user is an admin and redirects back to login if they are not.
   * 
   * @author Jaron | 1811-Java-Nick | 1/15/2019
   */
  checkIfAdmin() {
    if (!sessionStorage.getItem('admin')) {
      this.router.navigate(['adminLogin']);
    }
  }

  convertReservationsToCalendarEvent() {
    console.log('converting reservations to events');
    this.reservations.forEach((reservation) => {
      this.events.push({
        id: reservation.id,
        title: this.getTitle(reservation),
        start: new Date(reservation.startTime),
        end: new Date(reservation.endTime),
        color: colors.red,
      });
    });
    this.refresh.next();
  }

  /**
   * Gets a title to display for a reservation for the time, resource, and purpose
   *
   * @param reservation
   * @author Jaron | 1811-Java-Nick | 1/15/2019
   */
  getTitle(reservation: Reservation): string {
    let title: string;
    const startTime = this.convertTime(new Date(reservation.startTime));
    const endTime = this.convertTime(new Date(reservation.endTime));

    title = reservation.resourceId + ' ' + reservation.userId + ' ' + reservation.purpose +
            ' ' + startTime + ' to ' + endTime + ' ';

    return title;

  }

  /**
   * Converts from date to standard AM/PM time
   *
   * @param time
   */
  convertTime(time: Date): string {
    let isAm = true;
    if (time.getHours() >= 12) {
      isAm = false;
    }
    let timeString: string;
    let hours = time.getHours() % 12;
    if (hours === 0) {
      hours = 12;
    }

    const minutes = time.getMinutes();

    timeString = hours + ':' + minutes;
    if (minutes === 0) {
      timeString += '0';
    }
    if (isAm) {
      timeString += ' AM';
    } else {
      timeString += ' PM';
    }

    return timeString;
  }
}
