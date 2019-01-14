import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AssociateHomeComponent } from './components/associateHome/associate-home/associate-home.component';
import { SearchComponent } from './components/search/search/search.component';
import { ReservationsComponent } from './components/reservations/reservations/reservations.component';
import { ErrorComponent } from './components/error/error/error.component';
import { LoginComponent } from './components/login/login/login.component';
import { LoadingComponent } from './components/loading/loading/loading.component';
import { UserService } from './services/user/user.service';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminRegistrationComponent } from './components/admin/admin-registration/admin-registration.component';
import { AdminVerifiedComponent } from './components/admin/admin-verified/admin-verified.component';

const routes: Routes = [{
  component: LoginComponent,
  path: ''
}, {
  component: LoadingComponent,
  path: 'loading'
}, {
  component: AssociateHomeComponent,
  path: 'home',
 canActivate: [UserService]
}, {
  component: SearchComponent,
  path: 'search',
 canActivate: [UserService]
}, {
  component: SearchComponent,
  path: 'search/:openForm',
  canActivate: [UserService]
}, {
  component: ReservationsComponent,
  path: 'reservations',
 canActivate: [UserService]
}, {
  component: ErrorComponent,
  path: 'error'
}, {
  component: AdminLoginComponent,
  path: 'adminLogin'
}, {
  component: AdminRegistrationComponent,
  path: 'adminRegistration'
}, {
  component: AdminVerifiedComponent,
  path: 'adminVerified'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
