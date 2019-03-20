import { TestBed } from '@angular/core/testing';

import { ReservationIdBehaviorSetService } from './reservation-id-behavior-set.service';

describe('ReservationIdBehaviorSetService', () => {
  let idbehaviorService: ReservationIdBehaviorSetService;

  beforeEach(() => {
    idbehaviorService = new ReservationIdBehaviorSetService();
  });

  it('should be created', () => {
    expect(idbehaviorService).toBeTruthy();
  });
  it('should receive the initial value', (done: DoneFn) => {
    idbehaviorService.currentMessage.subscribe((value) => {
      expect(value).toBe(-1);
      done();
    });
  });
  it('should receive the next value', (done: DoneFn) => {
    idbehaviorService.changeId(2);
    idbehaviorService.currentMessage.subscribe((value) => {
      expect(value).toBe(2);
      done();
    });
  });
});
