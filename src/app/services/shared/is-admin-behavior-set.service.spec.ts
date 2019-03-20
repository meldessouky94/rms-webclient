import { TestBed } from '@angular/core/testing';

import { IsAdminBehaviorSetService } from './is-admin-behavior-set.service';

describe('IsAdminBehaviorSetService', () => {
  let abehaviorService: IsAdminBehaviorSetService;
  beforeEach(() => {
    abehaviorService = new IsAdminBehaviorSetService();
  });

  it('should be created', () => {
    expect(abehaviorService).toBeTruthy();
  });
  it('should receive the next value false', (done: DoneFn) => {
    abehaviorService.currentMessage.subscribe((value) => {
      expect(value).toBeFalsy();
      done();
    });
  });
  it('should receive the next value true', (done: DoneFn) => {
    abehaviorService.changeBoolean(true);
    abehaviorService.currentMessage.subscribe((value) => {
      expect(value).toBeTruthy();
      done();
    });
  });
});
