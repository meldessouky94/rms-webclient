import { ConfirmCreateComponent } from "./confirm-create.component";

/**
 * ConfirmCreateComponent unit testing
 * @author Mohamed Eldessouky, Thiago Mendoca
 */
describe('ConfirmCreateComponent', () => {
    let component: ConfirmCreateComponent;

    // Declare mocks
    let reservationServiceStub: {};
    let routerStub: {};
    let activeModalStub: {};

    // Initialize mocks
    beforeEach(() => {
        reservationServiceStub = {};
        routerStub = {};
        activeModalStub = {};
    });

    it('should create', () => {
        component = new ConfirmCreateComponent(<any>reservationServiceStub, <any>routerStub, <any>activeModalStub);
        expect(component).toBeTruthy();
    });
});
