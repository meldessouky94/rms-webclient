import { TestBed } from '@angular/core/testing';

import { TitleBehaviorSetService } from './title-behavior-set.service';

describe('TitleBehaviorSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleBehaviorSetService = TestBed.get(TitleBehaviorSetService);
    expect(service).toBeTruthy();
  });
});
