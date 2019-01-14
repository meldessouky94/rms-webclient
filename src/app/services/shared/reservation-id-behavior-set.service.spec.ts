import { TestBed } from '@angular/core/testing';

import { ReservationIdBehaviorSetService } from './reservation-id-behavior-set.service';

describe('ReservationIdBehaviorSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReservationIdBehaviorSetService = TestBed.get(ReservationIdBehaviorSetService);
    expect(service).toBeTruthy();
  });
});
