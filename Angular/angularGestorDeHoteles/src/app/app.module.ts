import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { DetailsHotelComponent } from './components/details-hotel/details-hotel.component';
import { EventsTypesComponent } from './components/events-types/events-types.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyHotelComponent } from './components/my-hotel/my-hotel.component';
import { MyHotelDetailsComponent } from './components/my-hotel-details/my-hotel-details.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    UsersComponent,
    HotelsComponent,
    DetailsHotelComponent,
    EventsTypesComponent,
    ProfileComponent,
    MyHotelComponent,
    MyHotelDetailsComponent,
    ReservationsComponent,
    MyReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
