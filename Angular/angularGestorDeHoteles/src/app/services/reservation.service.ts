import { Injectable } from '@angular/core';
import { GLOBAL } from "./global.service";
import { Observable } from "rxjs";
import { Reservation } from "../models/reservation.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  public url: String;
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getReservation(token, idHotel: string): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);

    return this._http.get(`${this.url}/getReservations/${idHotel}`, { headers: headersToken })
  }

  cancelReservation(token, idReservation: string): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);

    return this._http.delete(`${this.url}/cancelReservation/${idReservation}`, { headers: headersToken })
  }

  addReserve(token, reservation: Reservation, idRoom: string): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);
    let params = JSON.stringify(reservation);

    return this._http.post(`${this.url}/addReserve/${idRoom}`, params, { headers: headersToken })
  }

  getReservationUser(token, idUser: string): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);

    return this._http.get(`${this.url}/getReservationsUser/${idUser}`, { headers: headersToken })
  }
}
