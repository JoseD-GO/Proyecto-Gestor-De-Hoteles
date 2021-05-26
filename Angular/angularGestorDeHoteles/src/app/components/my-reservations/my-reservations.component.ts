import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss'],
  providers: [ReservationService, UserService]
})
export class MyReservationsComponent implements OnInit {
  public token;
  public identity;
  public reservationModel;

  constructor(public _userService: UserService,
    public _reservationService: ReservationService) {
      this.token = this._userService.getToken()
      this.identity = this._userService.getIdentity()
  }

  ngOnInit(): void {
    this.getReservationUser(this.identity._id)
  }

  getReservationUser(idUser){
    this._reservationService.getReservationUser(this.token, idUser).subscribe(
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
        this.getReservationUser(this.identity._id)
      }
    )
  }

}
