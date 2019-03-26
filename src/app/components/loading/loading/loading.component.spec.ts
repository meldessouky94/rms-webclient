import { LoadingComponent } from "./loading.component";

describe('LoadingComponent', () => {
    let component: LoadingComponent;

    // Declare mock dependencies 
    let activatedRouterStub: {};
    let userServiceStub: {};
    let routerStub: {};

    // Initialize mocks
    beforeEach(() => {
        activatedRouterStub = {};
        userServiceStub = {};
        routerStub = {};
    });

    // Begin tests
    it('should create', () =>  {
        component = new LoadingComponent(<any>activatedRouterStub, <any>userServiceStub, <any>routerStub)
        expect(component).toBeTruthy();
    });
})