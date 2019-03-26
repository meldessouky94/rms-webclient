import { AdminRegistrationComponent } from "./admin-registration.component";
import { AdminRegistrationService } from 'src/app/services/admin/admin-registration.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Admin } from 'src/app/models/admin';


/**
 * Admin Registration Component Unit Tests
 * @author Tyler Williams
 */
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

    it('should update validationMessage if' +
      ' registration is not successful', () => {
        component = new AdminRegistrationComponent(
          <any>adminRegServiceStub,
          <any>routerStub
        );

        let fakeSubject = new Subject<Admin>();
        let validInput = spyOn(AdminRegistrationComponent.prototype, 'validInput');
        let fakeError = new Error();

        adminRegServiceStub.registerAdmin.and.returnValue(fakeSubject);
        validInput.and.returnValue(true);
        component.onSubmitClick();
        fakeSubject.error(fakeError);
        expect(component.validationMessage).toBeDefined();
      });
  });

  describe('validInput', () => {
    it('should not let them register if' +
      ' a first name was not entered', () => {
        component = new AdminRegistrationComponent(
          <any>adminRegServiceStub,
          <any>routerStub
        );

        component.firstname = '';

        let valid = component.validInput();
        expect(component.validationMessage).toBeDefined();
        expect(valid).toBeFalsy();
      });

    it('should not let them register if' +
      ' a last name was not entered', () => {
        component = new AdminRegistrationComponent(
          <any>adminRegServiceStub,
          <any>routerStub
        );

        component.lastname = '';

        let valid = component.validInput();
        expect(component.validationMessage).toBeDefined();
        expect(valid).toBeFalsy();
      });

    it('should not let them register if' +
      ' a username is not entered', () => {
        component = new AdminRegistrationComponent(
          <any>adminRegServiceStub,
          <any>routerStub
        );

        component.username = '';

        let valid = component.validInput();
        expect(component.validationMessage).toBeDefined();
        expect(valid).toBeFalsy();

      });

    it('should not let them register if' +
      ' a username does not end with @revature.com', () => {
        component = new AdminRegistrationComponent(
          <any>adminRegServiceStub,
          <any>routerStub
        );

        component.username = 'asdf';
        // let endsWith = component.username.endsWith('@revature.com');

        let valid = component.validInput();
        expect(component.validationMessage).toBeDefined();
        expect(valid).toBeFalsy();
      });

    it('should deal with password validation' +
    ' if firstname, lastname, and username' +
    ' are defined and correct', () => {
      component = new AdminRegistrationComponent(
        <any>adminRegServiceStub,
        <any>routerStub
      );
      
      let validPw = spyOn(AdminRegistrationComponent.prototype, 'validatePassword');
      component.firstname = 'Peter';
      component.lastname = 'Parker';
      component.username = 'spiderman@revature.com';
      
      validPw.and.returnValue(true);

      let valid = component.validInput();
      expect(component.validationMessage).toBeFalsy();
      expect(valid).toBeTruthy();
    });

    it('should not let them register' +
    ' if firstname is defined but lastname and username' +
    ' are not', () => {
      component = new AdminRegistrationComponent(
        <any>adminRegServiceStub,
        <any>routerStub
      );
      
      component.firstname = 'Peter';
      component.lastname = '';
      component.username = '';

      let valid = component.validInput();
      expect(component.validationMessage).toBeDefined();
      expect(valid).toBeFalsy();
    });

    it('should not let them register' +
    ' if firstname and lastname are defined but username' +
    ' is not', () => {
      component = new AdminRegistrationComponent(
        <any>adminRegServiceStub,
        <any>routerStub
      );
      
      component.firstname = 'Peter';
      component.lastname = 'Parker';
      component.username = '';

      let valid = component.validInput();
      expect(component.validationMessage).toBeDefined();
      expect(valid).toBeFalsy();
    });

    it('should not let them register' +
    ' if firstname, lastname, and username are defined' +
    ' but username does not end with @rev...', () => {
      component = new AdminRegistrationComponent(
        <any>adminRegServiceStub,
        <any>routerStub
      );
      
      component.firstname = 'Peter';
      component.lastname = 'Parker';
      component.username = 'spiderman';

      let valid = component.validInput();
      expect(component.validationMessage).toBeDefined();
      expect(valid).toBeFalsy();
    });
  });

  describe('validatePassword', () => {
    it('should not let them register' + 
    ' if pw1 is not defined', () => {
      component = new AdminRegistrationComponent(
        <any>adminRegServiceStub,
        <any>routerStub
      );

      component.password1 = '';

      let valid = component.validatePassword();
      expect(component.validationMessage).toBeDefined();
      expect(valid).toBeFalsy();
    });

    it('should return false' +
    ' if the length of pw1 is less than 8', () => {
      component = new AdminRegistrationComponent(
        <any>adminRegServiceStub,
        <any>routerStub
      );
      
      // The following two lines were written because
      // Sonarlint cried about directly setting
      // password1 = 'asdf'
      let testpw1 = 'asdf';
      component.password1 = testpw1;

      let valid = component.validatePassword();
      expect(component.validationMessage).toBeDefined();
      expect(valid).toBeFalsy();
    });

    it('should return false' + 
    ' if pw1 != pw2', () => {
      component = new AdminRegistrationComponent(
        <any>adminRegServiceStub,
        <any>routerStub
      );

      let testpw1 = 'asdfgggggg';
      let testpw2 = 'hlkjgggggg';
      component.password1 = testpw1;
      component.password2 = testpw2;

      let valid = component.validatePassword();
      expect(component.validationMessage).toBeDefined();
      expect(valid).toBeFalsy();
    });


    it('should return true' + 
    ' if pw is > 8 in length and the confirm' +
    ' password check completes', () => {
      component = new AdminRegistrationComponent(
        <any>adminRegServiceStub,
        <any>routerStub
      );

      let testpw = 'pokemonmaster1234';

      component.password1 = testpw;
      component.password2 = testpw;

      let valid = component.validatePassword();
      expect(component.validationMessage).toBeFalsy();
      expect(valid).toBeTruthy();
    });
  });
});
