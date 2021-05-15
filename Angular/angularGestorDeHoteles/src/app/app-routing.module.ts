import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsHotelComponent } from './components/details-hotel/details-hotel.component';
import { HomeComponent } from './components/home/home.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'details-hotel/:idHotel', component: DetailsHotelComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
