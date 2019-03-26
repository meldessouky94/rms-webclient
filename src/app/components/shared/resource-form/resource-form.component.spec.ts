import { ResourceFormComponent } from "./resource-form.component";

/**
 * ResourceFormComponent unit tests
 * -- STATUS: BASE TESTS (IN PROGRESS)
 * @author Olabode Opapeju
 */
describe('ResourceFormComponent', () => {
  let component: ResourceFormComponent;

  // Declare mocks for the component
  let reservationServiceStub: {};
  let resourceServiceStub: { getCampuses: jasmine.Spy };
  let routerStub: {};

  // Initialize mocks to default values
  beforeEach(() => {
    reservationServiceStub = {};
    resourceServiceStub = {
      getCampuses: undefined
    };
    routerStub = {}
  });

  // BEGIN TESTS
  it('should create', () => {
    component = new ResourceFormComponent(<any>reservationServiceStub, <any>resourceServiceStub, <any>routerStub);
    expect(component).toBeTruthy();
  });

});
