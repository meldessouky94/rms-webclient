import { ReservationsComponent } from "./reservations.component";

describe('ReservationsComponent', () => {
    let component: ReservationsComponent;

    // Declare mocks
    let ngbAccordionConfigStub: {};
    let modalServiceStub: {};
    let reservationServiceStub: {};

    // Initialize mocks
    beforeEach(() => {
        ngbAccordionConfigStub = {};
        modalServiceStub = {};
        reservationServiceStub = {};
    });

    it('should create', () => {
        component = new ReservationsComponent(<any>ngbAccordionConfigStub, <any>modalServiceStub, <any>reservationServiceStub);
        expect(component).toBeTruthy();
    });
});
