import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { OffersComponent } from './components/offers/offers.component';
import { CitiesComponent } from './components/cities/cities.component';
import { UsersComponent } from './components/users/users.component';
import { StartPointComponent } from './components/start-point/start-point.component';
const routes: Routes = [
  {
    path:'', redirectTo: 'login', pathMatch:'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'tickets',
        component: TicketsComponent
      },
      {
        path: 'offers',
        component: OffersComponent
      },
      {
        path: 'cities',
        component: CitiesComponent
      },
      {
        path: 'startPoints',
        component: StartPointComponent
      },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
