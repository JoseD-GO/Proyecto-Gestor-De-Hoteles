import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { User } from 'src/app/models/user.model';
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
  public HotelModelAdd: Hotel;
  public UsersAdminHotel: User;
  public showModal = false;
  public identity;
  public rol;
  public num = 0;

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
    this.HotelModelAdd = new Hotel('','','','','',0,0,[{number: 0, numberBeds: 0, status: '',price: 0}],'','')
   }

  ngOnInit(): void {
    this.getHotels();
    if(this.rol === 'ROL_ADMIN'){
      this.getUsersAdminHotel();
    }
  }

  getHotels(){
    this._hotelService.getHotels(this.token).subscribe(
      response => {
        this.HotelModelGet = response.hotelsFound
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  getUsersAdminHotel(){
    this._userService.getUsersAdminHotel().subscribe(
      response => {
        this.UsersAdminHotel = response.usersFounds;
      }
    )
  }

  addHotel(){
    this._hotelService.addHotel(this.HotelModelAdd, this.token).subscribe(
      response => {
        this.HotelModelAdd.name = '';
        this.HotelModelAdd.address = '';
        this.HotelModelAdd.phoneNumber = '';
        this.HotelModelAdd.description = '';
        this.HotelModelAdd.imgLink = '';
        this.HotelModelAdd.idAdminHotel = '';
        this.showModal = !this.showModal;
        this.getHotels()
      }
    )
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

}
