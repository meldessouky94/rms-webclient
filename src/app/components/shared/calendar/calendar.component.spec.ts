import { CalendarComponent } from "./calendar.component";

/**
 * @author Olabode Opapeju
 */
describe('CalendarComponent', () => {
  let component: CalendarComponent;

  // Declare mocks
  let modalStub: {};
  let reservationServiceStub: {};
  let routerStub: {};
  let resIdBehaviourStub: {};

  //Initialize mocks
  beforeEach(() => {
    modalStub = {};
    reservationServiceStub = {};
    routerStub = {};
    resIdBehaviourStub = {};
  });

  it('should create', () => {
    component = new CalendarComponent(<any>modalStub, <any>reservationServiceStub, <any>routerStub, <any>resIdBehaviourStub);
    expect(component).toBeTruthy();
  });
});
