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
  public element;
  public showModal = false;
  public identity;
  public rol;

  constructor(
    private _hotelService: HotelService,
    private _userService: UserService
  ) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    if(this.identity.rol === 'ROL_ADMIN'){
      this.rol = 'ROL_ADMIN';
    }else if(this.identity.rol === 'ROL_ADMIN_HOTEL'){
      this.rol = 'ROL_ADMIN_HOTEL';
    }else if(this.identity.rol === 'ROL_USER'){
      this.rol = 'ROL_USER';
    }
   }

  ngOnInit(): void {
    this.getHotels();
    console.log(this.rol);

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

  toggleModal(){
    this.showModal = !this.showModal;
  }

}
