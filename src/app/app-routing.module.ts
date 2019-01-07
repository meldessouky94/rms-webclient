import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AssociateHomeComponent } from './components/associateHome/associate-home/associate-home.component';
import { SearchComponent } from './components/search/search/search.component';
import { ReservationsComponent } from './components/reservations/reservations/reservations.component';
import { ErrorComponent } from './components/error/error/error.component';
import { LoginComponent } from './components/login/login/login.component';
import { LoadingComponent } from './components/loading/loading/loading.component';
import { CalendarComponent } from './components/shared/calendar/calendar.component';
import { UserService } from './services/user/user.service';

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
  component: CalendarComponent,
  path: 'calendar'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
