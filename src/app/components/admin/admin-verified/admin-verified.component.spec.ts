import { AdminVerifiedComponent } from "./admin-verified.component";
import { Router } from '@angular/router';

describe('AdminVerifiedComponent', () => {
  let component: AdminVerifiedComponent

  let routerStub: {navigate: jasmine.Spy};

  beforeEach(() => {
    routerStub = {
      navigate: spyOn(Router.prototype, 'navigate')
    };
    component = new AdminVerifiedComponent(<any>routerStub);
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
