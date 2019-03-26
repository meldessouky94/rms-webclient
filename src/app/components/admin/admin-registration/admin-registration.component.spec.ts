import { AdminRegistrationComponent } from "./admin-registration.component";

describe('AdminRegistrationComponent', () => {
  let component: AdminRegistrationComponent;

  let adminRegServiceStub: {};
  let routerStub: {};

  beforeEach(() => {
    adminRegServiceStub = {};
    routerStub = {};
  })

  it('should create', () => {
    component = new AdminRegistrationComponent(<any>adminRegServiceStub, <any>routerStub);
    expect(component).toBeTruthy();
  });
});
