import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  public users
  public usersAH
  public showRol = false

  constructor(private _userService: UserService) {
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

  changeRol(){
    this.showRol = !this.showRol;
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
