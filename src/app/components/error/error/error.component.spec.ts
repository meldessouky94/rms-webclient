import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
  let component: ErrorComponent;

  let userServiceStub: {loginFailed: boolean} = {
    loginFailed: false,
  };
  it('should create', () => {
    component = new ErrorComponent(<any>userServiceStub);
    expect(component).toBeTruthy();
  });
  it('should assign false to loginFailed if user was able to login', () =>{
    component = new ErrorComponent(<any>userServiceStub);
    expect(component.loginFailed).toBeFalsy();
  });
  it('should assign true to loginFailed if user failed to login', () =>{
    userServiceStub.loginFailed = true;
    component = new ErrorComponent(<any>userServiceStub);
    expect(component.loginFailed).toBeTruthy();
  });

});
