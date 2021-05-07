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

  constructor(private _userService: UserService, private _router: Router) {
    this.user = new User("","","","","","","","")
  }

  ngOnInit(): void {
  }

  register(){
    this._userService.registerUser(this.user).subscribe(
      response => {
        this._router.navigate(['/login'])
        console.log(response)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario registrado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error => {
        console.log(<any>error)
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al registrar usuario!',
          showConfirmButton: true,
          timer: 1500
        })
      }
    )
  }

}
