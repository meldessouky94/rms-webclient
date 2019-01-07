import { TestBed } from '@angular/core/testing';

import { AdminRegistrationService } from './admin-registration.service';

describe('AdminRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminRegistrationService = TestBed.get(AdminRegistrationService);
    expect(service).toBeTruthy();
  });
});
