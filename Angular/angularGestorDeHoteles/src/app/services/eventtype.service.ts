import { Injectable } from '@angular/core';
import { GLOBAL } from "./global.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventType } from '../models/eventtype.model';

@Injectable({
  providedIn: 'root'
})
export class EventtypeService {
  public url: String;
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url
  }

  getTypes(token): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)

    return this._http.get(`${this.url}/getEventsTypes`, { headers: headersToken })
  }

  getTypeID(token, idType: string): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)

    return this._http.get(`${this.url}/getEventType/${idType}`,{ headers: headersToken })
  }

  addType(token, type: EventType): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)
    let params = JSON.stringify(type);

    return this._http.post(`${this.url}/addEventType`, params, { headers: headersToken })
  }

  editType(token, type: EventType): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)
    let params = JSON.stringify(type)

    return this._http.put(`${this.url}/editEventType/${type._id}`, params, { headers: headersToken })
  }

}
