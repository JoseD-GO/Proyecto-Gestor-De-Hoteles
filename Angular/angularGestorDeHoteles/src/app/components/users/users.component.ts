import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public users
  public usersAH
  public token;
  public showRol = false
  public showModal = false
  public UserModelAdd: User

  constructor(private _userService: UserService) {
    this.UserModelAdd = new User('','','','','','','','')
    this.token = this._userService.getToken()
  }

  ngOnInit(): void {
    this.getUsers();
    //this.getUserRol()
    this.getUsersAdminHotel()
  }

  getUsers(){
    this._userService.getUsers().subscribe(
      response => {
        this.users = response.usersFounds;
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  getUsersAdminHotel(){
    this._userService.getUsersAdminHotel().subscribe(
      response => {
        this.usersAH = response.adminsFounds;
      },
      error =>{
        console.log(<any>error)
      }
    )
  }

  registerUserAdminHotel(){
    this._userService.addUserAdminHotel(this.UserModelAdd, this.token).subscribe(
      response => {
        this.getUsersAdminHotel()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Admin registrado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModal = !this.showModal;
      },
      error => {
        console.log(<any>error)
      }
    )
  }

  changeRol(){
    this.showRol = !this.showRol;
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }


  /*getUserRol(){
    this._userService.getUsersRol(this.rol).subscribe(
      response => {
        console.log(this.rol)
        console.log(response)
      }
    )
  }*/

}
