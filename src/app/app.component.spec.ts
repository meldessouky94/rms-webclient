import { AppComponent } from "./app.component";

describe('AppComponent', () => {
    let component: AppComponent;

    // Mock dependencies
    let userServiceStub: {};

    // Initialize dependencies
    beforeEach(() => {
        userServiceStub = {};
    });

    it('should create the app', () => {
        component = new AppComponent(<any>userServiceStub);
        expect(component).toBeTruthy();
    });
});
