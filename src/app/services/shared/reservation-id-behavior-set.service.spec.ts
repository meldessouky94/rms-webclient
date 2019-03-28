import { ReservationIdBehaviorSetService } from './reservation-id-behavior-set.service';
import { Subscription } from 'rxjs';

/**
 * @author Jose Meono
 */
describe('ReservationIdBehaviorSetService', () => {
  let idbehaviorService: ReservationIdBehaviorSetService;
  let testSub: Subscription;

  beforeEach(() => {
    idbehaviorService = new ReservationIdBehaviorSetService();
  });

  it('should be created', () => {
    expect(idbehaviorService).toBeTruthy();
  });
  
  it('should receive the initial value', (done: DoneFn) => {
    testSub = idbehaviorService.currentMessage.subscribe((value) => {
      expect(value).toBe(-1);
      done();
    });
  });
  
  it('should receive the next value', (done: DoneFn) => {
    idbehaviorService.changeId(2);
    testSub = idbehaviorService.currentMessage.subscribe((value) => {
      expect(value).toBe(2);
      done();
    });
  });

  afterEach(() => {
    if (testSub) {
      testSub.unsubscribe();
    }
  });
});
