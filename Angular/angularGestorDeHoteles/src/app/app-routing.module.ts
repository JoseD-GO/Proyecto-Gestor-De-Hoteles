import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsHotelComponent } from './components/details-hotel/details-hotel.component';
import { EventsTypesComponent } from './components/events-types/events-types.component';
import { HomeComponent } from './components/home/home.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { LoginComponent } from './components/login/login.component';
import { MyHotelDetailsComponent } from './components/my-hotel-details/my-hotel-details.component';
import { MyHotelComponent } from './components/my-hotel/my-hotel.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'hotels', component: HotelsComponent },
  { path: 'details-hotel/:idHotel', component: DetailsHotelComponent },
  { path: 'events-types', component: EventsTypesComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'my-hotel', component: MyHotelComponent },
  { path: 'my-hotel-details/:idHotel', component: MyHotelDetailsComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
