
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

/**
 * Angular Calendar
 * 
 * Currently implemented calendar for admins only
 * Admins open to calendar and can click events to edit them
 * Events are pulled from backend database
 * 
 * Refer to the following url for details about angular-calendar
 * https://www.npmjs.com/package/angular-calendar
 * 
 * @author: Tim Ascencio
 * email: ascenciot123@gmail.com
 * batch: 1811-java-nick
 */
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

  /*
   * pencil and edit icon for events on calendar
   * feature can be seen on angular-calendar npm demo
   * not currently implemented into project
   * could be useful for user friendly design when choosing to edit events 
   */
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

  constructor(
    private modal: NgbModal, 
    private reservationService: ReservationService, 
    private router: Router,
    private reservationIdBehaviorSetService: ReservationIdBehaviorSetService
  ) {}

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

  /*
   * Click on event and pass id to get reservation
   * Pass reservation and route to editReservation
   * Allows editReservation to know about the reservation we want to edit
   */
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

  /*
   * When calendar opens up, get all reservations
   * run conversion for reservation to event
   */
  ngOnInit() {

    this.reservationService.getAllReservations().subscribe(
        (reservations) => { this.reservations = reservations;
                            this.convertReservationsToCalendarEvent(); },
        );
  }

  /*
   * set event values to reservation values
   * necessary to populate events on calendar
   */
  convertReservationsToCalendarEvent() {
    console.log('converting reservations to events');
    this.reservations.forEach((reservation) => {
      this.events.push({
        id: reservation.id,
        title: reservation.userId + ' ' + reservation.purpose,
        start: new Date(reservation.startTime),
        end: new Date(reservation.endTime),
        color: colors.red,
      });
    });
    this.refresh.next();
  }
}
