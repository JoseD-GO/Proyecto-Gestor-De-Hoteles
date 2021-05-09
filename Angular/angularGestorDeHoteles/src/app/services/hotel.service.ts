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
}
