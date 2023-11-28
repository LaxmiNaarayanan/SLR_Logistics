import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PriceEstimatorComponent } from './components/price-estimator/price-estimator.component';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { TrackerComponent } from './components/tracker/tracker.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'price-estimator', component: PriceEstimatorComponent },
  { path: 'new-booking', component: NewBookingComponent },
  { path: 'tracker', component: TrackerComponent },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
