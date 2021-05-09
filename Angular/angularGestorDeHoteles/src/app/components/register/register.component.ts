import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: User;
  public Pmessage: "The user already exists";
  public Smessage: "User couldn´t be registered";

  constructor(private _userService: UserService, private _router: Router) {
    this.user = new User("","","","","","","","")
  }

  ngOnInit(): void {
  }

  register(){
    this._userService.registerUser(this.user).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario registrado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this._router.navigate(['/login'])
      },
      error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al registrar usuario!',
          showConfirmButton: true,
          timer: 1500
        })
        /*var errorD = JSON.stringify(error.error.message);
        console.log(typeof errorD);
        switch (errorD) {
          case this.Pmessage:
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Usuario o email ya existen',
              showConfirmButton: true,
              timer: 1500
            })
            break;
            case this.Smessage:
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al registrar usuario!',
                showConfirmButton: true,
                timer: 1500
              })
            break;

          default:
            break;
        }*/

        /*if(errorD = this.Smessage){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Error al registrar usuario!',
            showConfirmButton: true,
            timer: 1500
          })
        }else if(errorD = this.Pmessage){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Usuario o email ya existen',
            showConfirmButton: true,
            timer: 1500
          })
        }*/
      }
    )
  }

}
