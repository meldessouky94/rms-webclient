import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Injectable
 */
@Injectable({
  providedIn: 'root',
})
export class IsAdminBehaviorSetService {

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeBoolean(bool: boolean) {
    this.messageSource.next(bool);
  }
}
