import { ViewResourcesComponent } from "./view-resources.component";

describe('ViewResourcesComponent', () => {
  let component: ViewResourcesComponent

  let reservationServiceStub: {};
  let modalServiceStub: {};
  let resourceServiceStub: {};

  beforeEach(() => {
    reservationServiceStub = {};
    modalServiceStub = {};
    resourceServiceStub = {};
  });

  it('should create', () => {
    component = new ViewResourcesComponent(<any>reservationServiceStub, <any>modalServiceStub, <any>resourceServiceStub);
    expect(component).toBeTruthy();
  });
});
