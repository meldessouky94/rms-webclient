import { NavBarComponent } from "./nav-bar.component";

/**
 * NavBarComponent unit tests
 * -- STATUS: BASE TESTS (IN PROGRESS)
 * @author Olabode Opapeju
 */
describe('NavBarComponent', () => {
  let component: NavBarComponent;

  // Declare mocks for the component
  let userServiceStub: {};
  let detectorStub: { getCampuses: jasmine.Spy };
  let routerStub: {};
  let isAdminStub: {};
  let pageTitleStub: {};

  // Initialize mocks to default values
  beforeEach(() => {
    userServiceStub = {};
    detectorStub = {
      getCampuses: undefined
    };
    routerStub = {}
    isAdminStub = {}
    pageTitleStub = {}
  });

  // BEGIN TESTS
  it('should create', () => {
    component = new NavBarComponent(<any>userServiceStub, <any>detectorStub, <any>routerStub, <any>isAdminStub, <any>pageTitleStub);
    expect(component).toBeTruthy();
  });

});
