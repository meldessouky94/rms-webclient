import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationIdBehaviorSetService {

  private messageSource = new BehaviorSubject(-1);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeId(id: number) {
    this.messageSource.next(id);
  }
}
