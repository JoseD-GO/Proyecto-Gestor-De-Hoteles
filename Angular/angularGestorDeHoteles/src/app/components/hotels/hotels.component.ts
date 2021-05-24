import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { User } from 'src/app/models/user.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [HotelService, UserService]
})
export class HotelsComponent implements OnInit {
  public token;
  public hotelModel: Hotel;
  public HotelModelGet: Hotel;
  public HotelModelAdd: Hotel;
  public UsersAdminHotel: User;
  public showModal = false;
  public showModalE = false;
  public identity;
  public rol;
  public num = 0;

  constructor(
    private _hotelService: HotelService,
    private _userService: UserService,
    private _router: Router
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
    this.hotelModel = new Hotel('','','','','',0,0,[{number: 0, numberBeds: 0, status: '',price: 0}],'','');
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
        this.UsersAdminHotel = response.adminsFounds;
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Hotel agregado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModal = !this.showModal;
        this.getHotels()
      },
      error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al agregar el hotel!',
          showConfirmButton: false,
          timer: 1500
        })
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

  toggleModal(){
    this.showModal = !this.showModal;
  }

  toggleModalE(){
    this.showModalE = !this.showModalE;
  }

  /*detailsHotel(idHotel){
    this._router.navigate(['/details-hotel', idHotel])
  }*/

}
