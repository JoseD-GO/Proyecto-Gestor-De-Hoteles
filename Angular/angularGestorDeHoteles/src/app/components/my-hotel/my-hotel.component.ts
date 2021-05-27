import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { User } from 'src/app/models/user.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-my-hotel',
  templateUrl: './my-hotel.component.html',
  styleUrls: ['./my-hotel.component.scss'],
  providers: [HotelService, UserService]
})
export class MyHotelComponent implements OnInit {
  public token;
  public identity;
  public hotelModel: Hotel;
  public HotelModelGet: Hotel;
  public UsersAdminHotel: User;
  public showModalE = false;
  public rol;
  public num = 0;

  constructor(private _hotelService: HotelService,
    private _userService: UserService) {
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.hotelModel = new Hotel('','','','','',0,0,[{number: 0, numberBeds: 0, status: '',price: 0}],'','');
  }

  ngOnInit(): void {
    this.getHotels()
  }

  getHotels(){
    this._hotelService.getHotelIdAdminHotel(this.token, this.identity._id).subscribe(
      response => {
        this.HotelModelGet = response.hotelFound
      }
    )
  }

  getHotelID(idHotel){
    this._hotelService.getHotelID(this.token, idHotel).subscribe(
      response => {
        this.hotelModel = response.hotelFound
      }
    )
  }

  getUsersAdminHotel(){
    this._userService.getUsersAdminHotel().subscribe(
      response => {
        this.UsersAdminHotel = response.adminsFounds;
      }
    )
  }

  editHotel(){
    this._hotelService.editHotel(this.token, this.hotelModel).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Hotel editado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalE = !this.showModalE;
        this.getHotels()
      },
      error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ha ocurrido un error!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  createPDF(idHotel){
    this._hotelService.createPDF(this.token, idHotel).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'PDF creado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  toggleModalE(){
    this.showModalE = !this.showModalE;
  }


}
