import { Injectable } from '@angular/core';
import { GLOBAL } from "./global.service";
import { Event } from "../models/event.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public url: String;
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getEvents(token, id: string): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)

    return this._http.get(`${this.url}/getEventsHotel/${id}`, { headers: headersToken })
  }

  getEventId(token, idEvent: string): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)

    return this._http.get(`${this.url}/getEventID/${idEvent}`,{ headers: headersToken })
  }

  addEvent(token, event: Event): Observable<any>{
    let headersToken = this.headersVar.set('Authorization', token)
    let params = JSON.stringify(event)

    return this._http.post(`${this.url}/addEvent`, params, { headers: headersToken })
  }
}
