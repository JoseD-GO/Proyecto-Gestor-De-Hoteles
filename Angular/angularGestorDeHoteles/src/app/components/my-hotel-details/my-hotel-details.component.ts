import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { EventType } from 'src/app/models/eventtype.model';
import { Hotel } from 'src/app/models/hotel.model';
import { Service } from 'src/app/models/service.model';
import { EventService } from 'src/app/services/event.service';
import { EventtypeService } from 'src/app/services/eventtype.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-my-hotel-details',
  templateUrl: './my-hotel-details.component.html',
  styleUrls: ['./my-hotel-details.component.scss']
})
export class MyHotelDetailsComponent implements OnInit {
  public hotelModel;
  public roomsHotel;
  public events;
  public services;
  public token;
  public idHotelRoute: string;
  public eventModelGet: Event;
  public eventModelAdd: Event;
  public idEvent: Event;
  public serviceModelGet: Service;
  public serviceModelAdd: Service;
  public click = '1';
  public showModal = false;
  public showModalE = false;
  public showModalEEdit = false;
  public showModalS = false;
  public showModalSAdd = false;
  public showModalSEdit = false;
  public showModalH = false;
  public identity;
  public typesGet: EventType;
  public room = {
    idHotel: '',
    name: '',
    numberBeds: 0,
    description: '',
    price: 0
  }

  constructor(
    public _userService: UserService,
    public _hotelService: HotelService,
    public _eventService: EventService,
    public _eventTypeService: EventtypeService,
    public _serviceService: ServiceService,
    private _router: Router,
    public _activetedRoute: ActivatedRoute
  ) {
    this.token = this._userService.getToken()
    this.hotelModel = new Hotel('','','','','',0,0,[{number: 0, numberBeds: 0, status: '',price: 0}],'','')
    this.eventModelGet = new Event('','','','','','','')
    this.eventModelAdd = new Event('','','','','','','')
    this.idEvent = new Event('','','','','','','')
    this.serviceModelGet = new Service('','','',0,'')
    this.serviceModelAdd = new Service('','','',0,'')
    this.identity = this._userService.getIdentity()
   }

  ngOnInit(): void {
    this._activetedRoute.paramMap.subscribe(dataRoute => {
      this.idHotelRoute = dataRoute.get('idHotel')
    })
    this.getHotelID(this.idHotelRoute)
    this.getEvents(this.idHotelRoute)
    this.getServicesIdHotel(this.idHotelRoute)
    if(this.identity.rol != 'ROL_USER'){
      this.getTypes()
    }
  }

  getHotelID(idHotel){
    this._hotelService.getHotelID(this.token, idHotel).subscribe(
      response => {
        this.hotelModel = response.hotelFound
      }
    )
  }

  getEvents(idHotel){
    this._eventService.getEvents(this.token, idHotel).subscribe(
      response => {
        this.events = response.eventsFound;
      }
    )
  }

  getEventID(idEvent){
    this._eventService.getEventId(this.token, idEvent).subscribe(
      response => {
        this.eventModelGet = response.eventFound
        this.idEvent = response.eventFound
      }
    )
  }

  getTypes(){
    this._eventTypeService.getTypes(this.token).subscribe(
      response => {
        this.typesGet = response.typesFounds
      }
    )
  }

  addEvent(){
    this.eventModelAdd.idHotel = this.idHotelRoute
    this._eventService.addEvent(this.token, this.eventModelAdd).subscribe(
      response => {
        this.eventModelAdd.name = '';
        this.eventModelAdd.description = '';
        this.eventModelAdd.date = '';
        this.eventModelAdd.duration = '';
        this.eventModelAdd.idEventType = '';
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Evento agregado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalE = !this.showModalE;
        this.getEvents(this.idHotelRoute)
      }
    )
  }

  editEvent(){
    this._eventService.editEvent(this.token, this.eventModelGet).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Evento editado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalEEdit = !this.showModalEEdit;
        this.getEvents(this.idHotelRoute)
      }
    )
  }

  getServicesIdHotel(idHotel){
    this._serviceService.getServiceHotel(this.token, idHotel).subscribe(
      response => {
        this.services = response.servicesFound;
      }
    )
  }

  getServiceId(idService){
    this._serviceService.getServiceID(this.token, idService).subscribe(
      response => {
        this.serviceModelGet = response.serviceFound
      }
    )
  }

  AddService(){
    this.serviceModelAdd.idHotel = this.idHotelRoute;
    this._serviceService.addService(this.token, this.serviceModelAdd).subscribe(
      response => {
        this.serviceModelAdd.name = '';
        this.serviceModelAdd.description = '';
        this.serviceModelAdd.price = 0;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Servicio agregado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalSAdd = !this.showModalSAdd;
        this.getServicesIdHotel(this.idHotelRoute)
      }
    )
  }

  editService(){
    this._serviceService.editService(this.token, this.serviceModelGet).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Servicio editado con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalSEdit = !this.showModalSEdit;
        this.getServicesIdHotel(this.idHotelRoute)
      }
    )
  }

  confirmDelete(){
    Swal.fire({
      title: '¿Esta seguro?',
      text: "No podra revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
         Swal.fire(
          'Eliminado!',
          'El hotel se ha eliminado correctamente',
          'success'
        )
        this.deleteHotel(this.idHotelRoute)
      }
    })
  }

  deleteHotel(idHotel){
    this._hotelService.deleteHotel(this.token, idHotel).subscribe(
      response => {
        this._router.navigate(['/hotels'])
      }
    )
  }

  getRoomsHotel(idHotel){
    this._hotelService.getRoomsHotel(this.token, idHotel).subscribe(
      response => {
        this.roomsHotel = response.bedrooms;
      }
    )
  }

  addRoom(){
    this.room.idHotel = String(this.idHotelRoute)
    this._hotelService.addRoomHotel(this.token, this.room).subscribe(
      response => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Habitación agregada con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        this.showModalH = !this.showModalH;
        this.getHotelID(this.idHotelRoute)

      }
    )
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

  toggleModalE(){
    this.showModalE = !this.showModalE;
  }

  toggleModalS(){
    this.showModalS = !this.showModalS;
  }

  toggleModalSAdd(){
    this.showModalSAdd = !this.showModalSAdd;
  }

  toggleModalEEdit(){
    this.showModalEEdit = !this.showModalEEdit;
  }

  toggleModalSEdit(){
    this.showModalSEdit = !this.showModalSEdit;
  }

  toggleModalH(){
    this.showModalH = !this.showModalH;
  }
}
