import { Injectable } from '@angular/core';
import { GLOBAL } from "./global.service";
import { Observable } from "rxjs";
import { Hotel } from "../models/hotel.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  public url: String;
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getHotels(token): Observable<any>{
     let headersToken = this.headersVar.set('Authorization', token);

     return this._http.get(`${this.url}/getHotels`, { headers: headersToken })
  }

  addHotel(hotel: Hotel, token): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);
    let params = JSON.stringify(hotel);

    return this._http.post(`${this.url}/addHotel`, params, { headers: headersToken })
  }

  getHotelID(token, id: string): Observable<any>{
     let headersToken = this.headersVar.set('Authorization', token)

    return this._http.get(`${this.url}/getHotelID/${id}`, { headers: headersToken })
  }

  editHotel(token, hotel: Hotel): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)
    let params = JSON.stringify(hotel);

    return this._http.put(`${this.url}/editHotel/${hotel._id}`, params, { headers: headersToken })
  }

  deleteHotel(token, idHotel: string): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)

    return this._http.delete(`${this.url}/deleteHotel/${idHotel}`, { headers: headersToken })
  }

  getRoomsHotel(token, idHotel: string): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)

    return this._http.get(`${this.url}/getRoomsHotel/${idHotel}`, { headers: headersToken })
  }

  addRoomHotel(token, room): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)
    let params = JSON.stringify(room)

    return this._http.put(`${this.url}/addRoom/${room.idHotel}`, params, { headers: headersToken })
  }

}
