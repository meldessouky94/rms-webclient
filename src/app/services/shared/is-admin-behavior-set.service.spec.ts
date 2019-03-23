import { TestBed } from '@angular/core/testing';

import { IsAdminBehaviorSetService } from './is-admin-behavior-set.service';
import { Subscription } from 'rxjs';

describe('IsAdminBehaviorSetService', () => {
  let abehaviorService: IsAdminBehaviorSetService;
  let testSub: Subscription

  beforeEach(() => {
    abehaviorService = new IsAdminBehaviorSetService();
  });

  it('should be created', () => {
    expect(abehaviorService).toBeTruthy();
  });

  it('should receive the next value false', (done: DoneFn) => {
    // let dummyCurrentMessage: {next: jasmine.Spy} = jasmine.createSpyObj('Subject', [ 'next' ]);
    // abehaviorService.currentMessage = <any>dummyCurrentMessage;
    // abehaviorService.changeBoolean(true);
    // expect(dummyCurrentMessage.next.calls.count()).toBe(1);

    testSub = abehaviorService.currentMessage.subscribe((value) => {
      expect(value).toBeFalsy();
      done();
    });
  });

  it('should receive the next value true', (done: DoneFn) => {
    abehaviorService.changeBoolean(true);
    testSub = abehaviorService.currentMessage.subscribe((value) => {
      expect(value).toBeTruthy();
      done();
    });
  });

  afterEach(() => {
    if (testSub) testSub.unsubscribe();
  });
});
