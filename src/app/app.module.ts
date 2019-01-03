import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssociateHomeComponent } from './components/associateHome/associate-home/associate-home.component';
import { QuickResViewComponent } from './components/associateHome/quick-res-view/quick-res-view.component';

import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ResourceFormComponent } from './components/shared/resource-form/resource-form.component';

import { SearchComponent } from './components/search/search/search.component';
import { ViewResourcesComponent } from './components/search/view-resources/view-resources.component';
import { ReservationsComponent } from './components/reservations/reservations/reservations.component';
import { SuccessComponent } from './components/success/success/success.component';
import { ErrorComponent } from './components/error/error/error.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReservationService } from './services/reservation/reservation.service';
import { ResourceService } from './services/resource/resource.service';
import { LoginComponent } from './components/login/login/login.component';
import { UserService } from './services/user/user.service';
import { LoadingComponent } from './components/loading/loading/loading.component';
import { CancelReservationPopupComponent } from './components/reservations/cancel-reservation-popup/cancel-reservation-popup.component';
import { ConfirmCreateComponent } from './components/search/confirm-create/confirm-create.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './components/admin/admin-registration/admin-registration.component';
import { DataService } from './services/shared/data.service';


@NgModule({
  declarations: [
    AppComponent,
    AssociateHomeComponent,
    QuickResViewComponent,
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    ResourceFormComponent,
    SearchComponent,
    ViewResourcesComponent,
    ReservationsComponent,
    SuccessComponent,
    ErrorComponent,
    LoginComponent,
    ConfirmCreateComponent,
    CancelReservationPopupComponent,
    LoadingComponent,
    AdminLoginComponent,
    AdminRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    MatIconModule
  ],
  providers: [
    ReservationService,
    ResourceService,
    UserService,
    DataService
  ],
  entryComponents: [
    ConfirmCreateComponent,
    CancelReservationPopupComponent
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
