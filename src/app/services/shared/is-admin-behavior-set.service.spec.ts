import { TestBed } from '@angular/core/testing';

import { IsAdminBehaviorSetService } from './is-admin-behavior-set.service';

describe('IsAdminBehaviorSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsAdminBehaviorSetService = TestBed.get(IsAdminBehaviorSetService);
    expect(service).toBeTruthy();
  });
});
