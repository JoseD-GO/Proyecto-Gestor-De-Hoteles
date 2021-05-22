import { Component, OnInit } from '@angular/core';
import { EventType } from 'src/app/models/eventtype.model';
import { EventtypeService } from 'src/app/services/eventtype.service';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-events-types',
  templateUrl: './events-types.component.html',
  styleUrls: ['./events-types.component.scss'],
  providers: [EventtypeService, UserService]
})
export class EventsTypesComponent implements OnInit {
  public token;
  public typesGet;
  public typeModelID: EventType;
  public typeModelAdd: EventType;
  public showModal = false;

  constructor(
    public _eventTypeService: EventtypeService,
    public _userService: UserService
  ) {
    this.token = this._userService.getToken();
    this.typeModelAdd = new EventType('','')
    this.typeModelID = new EventType('','')
  }

  ngOnInit(): void {
    this.getTypes()
  }

  getTypes(){
    this._eventTypeService.getTypes(this.token).subscribe(
      response => {
        this.typesGet = response.typesFounds
      }
    )
  }

  getTypeID(idType){
    this._eventTypeService.getTypeID(this.token, idType).subscribe(
      response => {
        this.typeModelID = response.typeFound;
      }
    )
  }

  addType(){
    this._eventTypeService.addType(this.token, this.typeModelAdd).subscribe(
      response => {
        this.typeModelAdd.name = '';
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tipo Evento agregado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.getTypes()
      }
    )
  }

  editType(){
    this._eventTypeService.editType(this.token, this.typeModelID).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Tipo Evento editado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModal = !this.showModal;
        this.getTypes()
      }
    )
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

}
