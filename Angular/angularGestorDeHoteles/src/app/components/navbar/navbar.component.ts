import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [UserService]
})
export class NavbarComponent implements OnInit {
  public identity;
  public rol;

  constructor(public _userService: UserService) {
    this.identity = this._userService.getIdentity();
    if(this.identity.rol === 'ROL_ADMIN'){
      this.rol = 'ROL_ADMIN'
    }else if(this.identity.rol === 'ROL_ADMIN_HOTEL'){
      this.rol = 'ROL_ADMIN_HOTEL'
    }else if(this.identity.rol === 'ROL_USER'){
      this.rol = 'ROL_USER'
    }
   }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token')
  }

}
