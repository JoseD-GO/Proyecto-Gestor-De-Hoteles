import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { Reservation } from 'src/app/models/reservation.model';
import { BillService } from 'src/app/services/bill.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
  providers: [ReservationService, UserService, HotelService, BillService]
})
export class ReservationsComponent implements OnInit {
  public token;
  public hotelModel;
  public idHotelRoute;
  public reservationModel: Reservation;
  public idBill;

  constructor(
    public _reservationService: ReservationService,
    public _userService: UserService,
    public _hotelService: HotelService,
    public _billService: BillService,
    public _activetedRoute: ActivatedRoute,
    private _router: Router) {
    this.token = this._userService.getToken()
    this.hotelModel = new Hotel('','','','','',0,0,[{number: 0, numberBeds: 0, status: '',price: 0}],'','')
  }

  ngOnInit(): void {
    this._activetedRoute.paramMap.subscribe(dataRoute => {
      this.idHotelRoute = dataRoute.get('idHotel')
    })
    this.getHotelID(this.idHotelRoute)
    this.getReservation()
  }

  getHotelID(idHotel){
    this._hotelService.getHotelID(this.token, idHotel).subscribe(
      response => {
        this.hotelModel = response.hotelFound
      }
    )
  }

  getReservation(){
    this._reservationService.getReservation(this.token, this.idHotelRoute).subscribe(
      response => {
        this.reservationModel = response.reservationsFound;
      }
    )
  }

  confirmCancel(idReservation){
    Swal.fire({
      title: '¿Esta seguro?',
      text: "No podra revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
         Swal.fire(
          'Eliminado!',
          'La reservación se ha cancelado correctamente',
          'success'
        )
        this.cancelReservartion(idReservation)
      }
    })
  }

  cancelReservartion(idReservation){
    this._reservationService.cancelReservation(this.token, idReservation).subscribe(
      response => {
        this.getReservation();
      }
    )
  }

  createBill(idReservation){
    this._billService.createBill(idReservation, this.token).subscribe(
      response => {
        this.idBill = response.billSaved._id
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Factura creada con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this._router.navigate(['/bill-reservation', this.idBill])
      }
    )
  }


}
