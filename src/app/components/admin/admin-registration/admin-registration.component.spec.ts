import { AdminRegistrationComponent } from "./admin-registration.component";
import { AdminRegistrationService } from 'src/app/services/admin/admin-registration.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Admin } from 'src/app/models/admin';

describe('AdminRegistrationComponent', () => {
  let component: AdminRegistrationComponent;

  let adminRegServiceStub: {
    registerAdmin: jasmine.Spy
  };

  let routerStub: {
    navigate: jasmine.Spy
  };

  beforeEach(() => {
    adminRegServiceStub = {
      registerAdmin: spyOn(AdminRegistrationService.prototype, 'registerAdmin')
    };
    routerStub = {
      navigate: spyOn(Router.prototype, 'navigate')
    };
  })

  it('should create', () => {
    component = new AdminRegistrationComponent(<any>adminRegServiceStub, <any>routerStub);
    expect(component).toBeTruthy();
  });

  describe('onSubmitClick', () => {
    it('should call setItem and navigate if admin'
      + ' registration is successful', () => {
        component = new AdminRegistrationComponent(
          <any>adminRegServiceStub,
          <any>routerStub
        );

        let setItem = spyOn(sessionStorage, 'setItem');
        let fakeSubject = new Subject<Admin>(); // makes container to put admin "reponse" in
        let validInput = spyOn(AdminRegistrationComponent.prototype, 'validInput');
        let fakeAdmin = new Admin();

        adminRegServiceStub.registerAdmin.and.returnValue(fakeSubject);
        validInput.and.returnValue(true);
        component.onSubmitClick();
        fakeSubject.next(fakeAdmin); // fills fakeSubject container with component.admin
        expect(setItem).toHaveBeenCalledWith('justRegistered', 'yes');
        expect(routerStub.navigate).toHaveBeenCalled();
      });
  });
});
