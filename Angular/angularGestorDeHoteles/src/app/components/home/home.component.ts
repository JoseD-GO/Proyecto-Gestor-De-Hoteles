import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HotelService, UserService]
})
export class HomeComponent implements OnInit {
  public token;
  public popularHotels: Hotel;

  constructor(private _hotelService: HotelService, private _userService: UserService) {
    this.token = this._userService.getToken()
  }

  ngOnInit(): void {
    this.getPopularHotel()
    console.log(this._userService.getToken());

  }

  getPopularHotel(){
    this._hotelService.getPopularHotels(this.token).subscribe(
      response => {
        this.popularHotels = response.hotelsFound
      },
      error => {
        console.log(<any>error);
      }
    )
  }


}
