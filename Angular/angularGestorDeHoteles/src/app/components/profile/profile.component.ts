import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  public identityP;
  public userModel: User;
  public showModalN = false;
  public showModalLN = false;
  public showModalU = false;
  public showModalE = false;
  public showModalI = false;

  constructor(public _userService: UserService, private _router: Router) {

    this.userModel = new User('','','','','','','','')
  }

  ngOnInit(): void {
    this.userModel = this.getIdentity()
  }

  editUserN(){
    this.userModel = this.identityP;
    this._userService.editUser(this.userModel).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario editado con exito!',
          text: 'Los datos podríar tardar en actualizarse',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalN = !this.showModalN;
      },
      error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se han podido editar los datos!',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalN = !this.showModalN;
      }
    )
  }

  editUserLN(){
    this.userModel = this.identityP;
    this._userService.editUser(this.userModel).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario editado con exito!',
          text: 'Los datos podríar tardar en actualizarse',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalLN = !this.showModalLN;
      },
      error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se han podido editar los datos!',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalLN = !this.showModalLN;
      }
    )
  }

  editUserI(){
    this.userModel = this.identityP;
    this._userService.editUser(this.userModel).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario editado con exito!',
          text: 'Los datos podríar tardar en actualizarse',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalI = !this.showModalI;
      },
      error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se han podido editar los datos!',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalI = !this.showModalI;
      }
    )
  }

  editUsername(){
    this.userModel = this.identityP;
    this._userService.editUsername(this.userModel).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario editado con exito!',
          text: 'Los datos podríar tardar en actualizarse',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalU = !this.showModalU;
      },
      error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Nombre de usuario ya existe!',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          window.location.reload()
        })
        this.showModalU = !this.showModalU;
      }
    )
  }

  editEmail(){
    this.userModel = this.identityP;
    this._userService.editEmail(this.userModel).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario editado con exito!',
          text: 'Los datos podríar tardar en actualizarse',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalE = !this.showModalE;
      },
      error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Email ya existe!',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          window.location.reload()
        })
        this.showModalE = !this.showModalE;
      }
    )
  }

  confirmDelete(){
    Swal.fire({
      title: '¿Esta seguro?',
      text: "No podra revitir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'El usuario se ha eliminado correctamente',
          'success'
        )
        this.deleteUser()
      }
    })
  }

  deleteUser(){
    this._userService.deleteUser().subscribe(
      response => {
        localStorage.clear()
        this._router.navigate(['/login'])
      }
    )
  }

  getIdentity(){
    var identityD = JSON.parse(localStorage.getItem('identity'));
    if(identityD != 'undefined'){
      this.identityP = identityD;
    }else {
      this.identityP = null;
    }
    return this.identityP;
  }

  toggleModalN(){
    this.showModalN = !this.showModalN;
  }

  toggleModalLN(){
    this.showModalLN = !this.showModalLN;
  }

  toggleModalU(){
    this.showModalU = !this.showModalU;
  }

  toggleModalE(){
    this.showModalE = !this.showModalE;
  }

  toggleModalI(){
    this.showModalI = !this.showModalI;
  }

}
