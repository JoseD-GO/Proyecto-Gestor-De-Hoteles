import { Injectable } from '@angular/core';
import { GLOBAL } from "./global.service";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  public url: String;
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  viewBills(idBill: String, token): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);

    return this._http.get(`${this.url}/viewBill/${idBill}`, { headers: headersToken })
  }

  createBill(idReservation: String, token): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);

    return this._http.get(`${this.url}/createBill/${idReservation}`, { headers: headersToken })
  }

  getBillUser(token, idUser: String): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);

    return this._http.get(`${this.url}/getBillsUser/${idUser}`, { headers: headersToken })
  }

  getBillsHotel(token, idHotel: String): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token);

    return this._http.get(`${this.url}/getBillsHotel/${idHotel}`, { headers: headersToken })
  }

}
