import { TitleBehaviorSetService } from './title-behavior-set.service';
import { Subscription } from 'rxjs';

/**
 * @author Jose Meono
 */
describe('TitleBehaviorSetService', () => {
  let titleBehaviorService: TitleBehaviorSetService;
  let testSub: Subscription;

  beforeEach(() => {
    titleBehaviorService = new TitleBehaviorSetService();
  });

  it('should be created', () => {
    expect(titleBehaviorService).toBeTruthy();
  });

  it('should receive the default message', (done: DoneFn) =>{
    testSub = titleBehaviorService.currentMessage.subscribe((message) => {
      expect(message).toBe('default message');
      done();
    });
  });

  it('should receive new message', (done: DoneFn) => {
    titleBehaviorService.changeMessage('new message');
    testSub = titleBehaviorService.currentMessage.subscribe((message) => {
      expect(message).toBe('new message');
      done();
    });
  });

  afterEach(() => {
    if (testSub) {
      testSub.unsubscribe();
    }
  });
});
