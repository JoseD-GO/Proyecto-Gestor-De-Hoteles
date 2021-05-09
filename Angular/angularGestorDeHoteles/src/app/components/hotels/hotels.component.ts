import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [HotelService, UserService]
})
export class HotelsComponent implements OnInit {
  public token;
  public HotelModelGet: Hotel;

  constructor(
    private _hotelService: HotelService,
    private _userService: UserService
  ) {
    this.token = this._userService.getToken();
   }

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels(){
    this._hotelService.getHotels(this.token).subscribe(
      response => {
        console.log(response)
        this.HotelModelGet = response.hotelsFound
      },
      error => {
        console.log(<any>error)
      }
    )
  }

}
