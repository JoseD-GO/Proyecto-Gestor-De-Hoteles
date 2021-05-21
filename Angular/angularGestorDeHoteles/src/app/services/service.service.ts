import { Injectable } from '@angular/core';
import { GLOBAL } from "./global.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public url: String;
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getServiceHotel(token, idHotel: string): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)

    return this._http.get(`${this.url}/getServicesHotel/${idHotel}`, { headers: headersToken })
  }

  getServiceID(token, idService: string): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)

    return this._http.get(`${this.url}/getServiceID/${idService}`,{ headers: headersToken })
  }

  addService(token, service: Service): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)
    let params = JSON.stringify(service)

    return this._http.post(`${this.url}/addService`, params, { headers: headersToken })
  }

  editService(token, service: Service): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)
    let params = JSON.stringify(service)

    return this._http.put(`${this.url}/editService/${service._id}`, params, { headers: headersToken })
  }
}
