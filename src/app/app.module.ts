import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    AssociateHomeComponent,
    QuickResViewComponent,
    ResFormComponent,
    NavBarComponent,
    HeaderComponent,
    FooterComponent,
    ResourceFormComponent,
    SchedulingViewComponent,
    SearchComponent,
    ViewResourcesComponent,
    ReservationsComponent,
    SuccessComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
