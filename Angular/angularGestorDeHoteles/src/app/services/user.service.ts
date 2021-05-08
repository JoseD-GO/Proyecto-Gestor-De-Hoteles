import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { GLOBAL } from "./global.service";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: String;
  public identity;
  public token;
  public headersVar = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  registerUser(user: User): Observable<any>{
    let params = JSON.stringify(user);

    return this._http.post(this.url+'/registerUser', params, { headers: this.headersVar } )
  }

  getUsers(): Observable<any>{

    return this._http.get(`${this.url}/registeredUsers`, { headers: this.headersVar })
  }

  login(user, getToken = null): Observable<any>{
    if(getToken != null){
      user.getToken = getToken;
    }
    let params = JSON.stringify(user)

    return this._http.post(`${this.url}/login`, params, { headers: this.headersVar })
  }

  getIdentity(){
    var identityD = JSON.parse(localStorage.getItem('identity'));
    if(identityD != 'undefined'){
      this.identity = identityD;
    }else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    var tokenD = localStorage.getItem('token');
    if(tokenD != 'undefined'){
      this.token = tokenD;
    }else {
      this.token = null
    }

    return this.token;
  }
}
