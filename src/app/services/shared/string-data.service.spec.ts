import { TestBed } from '@angular/core/testing';

import { StringDataService } from './string-data.service';

describe('StringDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StringDataService = TestBed.get(StringDataService);
    expect(service).toBeTruthy();
  });
});
