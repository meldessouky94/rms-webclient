import { IsAdminBehaviorSetService } from './is-admin-behavior-set.service';
import { Subscription } from 'rxjs';

/**
 * @author Jose Meono
 */
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
    if (testSub) {
      testSub.unsubscribe();
    }
  });
});
