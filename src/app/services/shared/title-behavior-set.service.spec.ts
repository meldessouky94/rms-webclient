import { TestBed } from '@angular/core/testing';

import { TitleBehaviorSetService } from './title-behavior-set.service';

describe('TitleBehaviorSetService', () => {
  let titleBehaviorService: TitleBehaviorSetService;
  beforeEach(() => {
    titleBehaviorService = new TitleBehaviorSetService();
  });

  it('should be created', () => {
    expect(titleBehaviorService).toBeTruthy();
  });
  it('should receive the default message', (done: DoneFn) =>{
    titleBehaviorService.currentMessage.subscribe((message) => {
      expect(message).toBe('default message');
      done();
    });
  });
  it('should receive new message', (done: DoneFn) => {
    titleBehaviorService.changeMessage('new message');
    titleBehaviorService.currentMessage.subscribe((message) => {
      expect(message).toBe('new message');
      done();
    });
  });
});
