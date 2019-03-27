import { LoadingComponent } from "./loading.component";
import { UserService } from 'src/app/services/user/user.service';
import { Subject, of } from 'rxjs';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';


/**
 * Unit Tests for Loading Component
 * @author Tyler Williams
 */
describe('LoadingComponent', () => {
    let component: LoadingComponent;

    // Declare mock dependencies 
    let activatedRouterStub: {
        queryParams: any;
    };
    let userServiceStub: {
        $currentUser: Subject<User>,
        getToken: jasmine.Spy,
        canActivate: jasmine.Spy
    };
    let routerStub: {
        navigate: jasmine.Spy;
    };

    // Initialize mocks
    beforeEach(() => {
        activatedRouterStub = {
            queryParams: of({ code: 'asdf' })
        };
        userServiceStub = {
            getToken: spyOn(UserService.prototype, 'getToken'),
            $currentUser: new Subject(),
            canActivate: spyOn(UserService.prototype, 'canActivate')
        };
        routerStub = {
            navigate: spyOn(Router.prototype, 'navigate')
        };
        component = new LoadingComponent(<any>activatedRouterStub, <any>userServiceStub, <any>routerStub)
    });

    // Begin tests
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get the token from UserService on init', () => {
        component.ngOnInit();
        expect(userServiceStub.getToken).toHaveBeenCalled();
    });

    it('should unsubscribe from userSub and' +
    ' paramsSub when destroyed', () => {
        let dummyUserSub = new Subject();
        let dummyParamSub = new Subject();
        component.paramsSub = dummyParamSub.subscribe();
        component.userSubscription = dummyUserSub.subscribe();
        component.ngOnDestroy();
        expect(component.paramsSub.closed).toBeTruthy();
        expect(component.userSubscription.closed).toBeTruthy();
    });

    describe('loadValues', () => {
        it('should get the current user' +
        ' and if route guard passes then' +
        ' navigate to home', () => {
            let fakeUser = new User();

            userServiceStub.canActivate.and.returnValue(true);

            component.loadValues();
            userServiceStub.$currentUser.next(fakeUser);
            expect(routerStub.navigate).toHaveBeenCalled();
        });
    });
})