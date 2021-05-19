import { Injectable } from '@angular/core';
import { GLOBAL } from "./global.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

}
