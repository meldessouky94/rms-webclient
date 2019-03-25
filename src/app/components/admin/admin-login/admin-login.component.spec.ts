import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginComponent } from './admin-login.component';
import { Subject } from 'rxjs';
import { Admin } from 'src/app/models/admin';
import { AdminLoginService } from 'src/app/services/admin/admin-login.service';


/**
 * Admin Login Component Unit Tests
 * @author Tyler Williams
 */
describe('AdminLoginComponent', () => {
    let component: AdminLoginComponent;
    let fixture: ComponentFixture<AdminLoginComponent>;

    // Mock dependencies for the component
    let adminLoginServiceStub: {
        validateUser: jasmine.Spy
    } = jasmine.createSpyObj('AdminLoginService', ['validateUser']);

    let isAdminBehaviorSetServiceStub: {
        currentMessage: Subject<number>
    } = {
        currentMessage: new Subject()
    }

    let titleBehaviorSetServiceStub: {
        currentMessage: Subject<string>
    } = {
        currentMessage: new Subject()
    }
    


    it('should create', () => {
        component = new AdminLoginComponent(
            <any> adminLoginServiceStub,
            <any> isAdminBehaviorSetServiceStub,
            <any> titleBehaviorSetServiceStub
        );
        expect(component).toBeTruthy();
    });

    it('should set justRegistered to true on init'
    + ' if the admin has just registered', () => {
        component = new AdminLoginComponent(
            <any> adminLoginServiceStub,
            <any> isAdminBehaviorSetServiceStub,
            <any> titleBehaviorSetServiceStub
        );
        let getItem = spyOn(sessionStorage, 'getItem');
        let setItem = spyOn(sessionStorage, 'setItem');

        getItem.and.returnValue('yes');
        component.ngOnInit();

        expect(component.justRegistered).toBeTruthy();
        expect(setItem).toHaveBeenCalledWith('justRegistered', 'no');
    });

    it('should set justRegistered to false on init'
    + ' if the admin has just registered', () => {
        component = new AdminLoginComponent(
            <any> adminLoginServiceStub,
            <any> isAdminBehaviorSetServiceStub,
            <any> titleBehaviorSetServiceStub
        );
        let getItem = spyOn(sessionStorage, 'getItem');
        let setItem = spyOn(sessionStorage, 'setItem');

        getItem.and.returnValue('');
        component.ngOnInit();

        expect(component.justRegistered).toBeFalsy();
        expect(setItem).toHaveBeenCalledWith('justRegistered', 'no');
    });

    describe('onSubmitClick', () => {
        it('should call runLoginEvents if admin object'
        + ' is successfully returned by the server', () => {
            component = new AdminLoginComponent(
                <any> adminLoginServiceStub,
                <any> isAdminBehaviorSetServiceStub,
                <any> titleBehaviorSetServiceStub
            );

            let runLogin = spyOn(AdminLoginComponent.prototype, 'runLoginEvents');
            let fakeSubject = new Subject<Admin>(); // makes container to put admin "reponse" in

            adminLoginServiceStub.validateUser.and.returnValue(fakeSubject);
            component.onSubmitClick();
            fakeSubject.next(component.admin); // fills fakeSubject container with component.admin
            expect(runLogin).toHaveBeenCalled();
        });

        it('should produce an error if an'
        + ' error happens in the server', () => {
            component = new AdminLoginComponent(
                <any> adminLoginServiceStub,
                <any> isAdminBehaviorSetServiceStub,
                <any> titleBehaviorSetServiceStub
            );
            
            let fakeSubject = new Subject<Admin>();
            
            adminLoginServiceStub.validateUser.and.returnValue(fakeSubject);
            component.onSubmitClick();
            fakeSubject.error(new Error());
            expect(component.errorMessage).toBeDefined();
        });

    });

    describe('runLoginEvents', () => {

    });
});
