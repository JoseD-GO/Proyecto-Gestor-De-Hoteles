import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import Swal from "sweetalert2"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public userModel: User;
  public token;
  public identity;

  constructor(private _usuarioService: UserService) {
    this.userModel = new User("","","","","","","","");
   }

  ngOnInit(): void {
  }

  getToken(){
    this._usuarioService.login(this.userModel, 'true').subscribe(
      response => {
        this.token = response.token;
        localStorage.setItem('token', this.token);
      }
    )
  }

  login(){
    this._usuarioService.login(this.userModel,'true').subscribe(
      response => {
        this.identity = response.userFound;
        localStorage.setItem('identity', JSON.stringify(this.identity));
        this.getToken()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'usuario logeado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Email o contraseña incorrectos',
          showConfirmButton: true,
          timer: 1500
        })
      }
    )
  }

}
