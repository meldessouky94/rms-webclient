import { LoginComponent } from './login.component';
import { User } from '../../../models/user';
import { Subject } from 'rxjs';

/**
 * Login Component Unit Tests
 * @author Olabode Opapeju
 */
describe('LoginComponent', () => {
  let component: LoginComponent;

  // Mock dependencies for the component
  let userServiceStub: {currentUser: User, $currentUser: Subject<User>} = {
    currentUser: undefined,
    $currentUser: new Subject()
  };
  let routerStub: {navigate: jasmine.Spy} = jasmine.createSpyObj('Router', ['navigate']);

  it('should create', () => {
    component = new LoginComponent(<any>routerStub, <any>userServiceStub);
    expect(component).toBeTruthy()
  });

  it('should call authConfirmation upon component init', () => {
    component = new LoginComponent(<any>routerStub, <any>userServiceStub);
    userServiceStub.currentUser = new User();
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalled();
  });

  it('should unsubscribe when component is destroyed', () => {
    component = new LoginComponent(<any>routerStub, <any>userServiceStub);
    component.ngOnInit();
    expect(component.currentUserSub).toBeTruthy();
    component.ngOnDestroy();
    expect(component.currentUserSub.closed).toBeTruthy();
  });

  describe('authConfirmation', () => {
    it('should call router.navigate() if a current user already exists', () => {
      component = new LoginComponent(<any>routerStub, <any>userServiceStub);
      userServiceStub.currentUser = new User();
      component.authConfirmation();
      expect(routerStub.navigate).toHaveBeenCalled();
    });

    it('should call router.navigate() whenever a current user has been set in the user service', () => {
      component = new LoginComponent(<any>routerStub, <any>userServiceStub);
      component.authConfirmation();
      expect(routerStub.navigate).not.toHaveBeenCalled();
      expect(component.currentUserSub).toBeTruthy();
      expect(component.currentUserSub.closed).toBeFalsy();
      // Simulate user logging in
      userServiceStub.$currentUser.next(new User());
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    userServiceStub = {
      currentUser: undefined,
      $currentUser: new Subject()
    };
    routerStub = jasmine.createSpyObj('Router', ['navigate']);
  })

});
