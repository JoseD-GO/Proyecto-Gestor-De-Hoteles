import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { EventType } from 'src/app/models/eventtype.model';
import { Hotel } from 'src/app/models/hotel.model';
import { EventService } from 'src/app/services/event.service';
import { EventtypeService } from 'src/app/services/eventtype.service';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-details-hotel',
  templateUrl: './details-hotel.component.html',
  styleUrls: ['./details-hotel.component.scss'],
  providers: [ UserService, HotelService, EventService, EventtypeService]
})
export class DetailsHotelComponent implements OnInit {
  public hotelModel;
  public events
  public token;
  public idHotelRoute: string;
  public eventModelGet: Event;
  public eventModelAdd: Event
  public click = '1';
  public showModal = false;
  public showModalE = false;
  public identity;
  public typesGet: EventType;

  constructor(
    public _userService: UserService,
    public _hotelService: HotelService,
    public _eventService: EventService,
    public _eventTypeService: EventtypeService,
    public _activetedRoute: ActivatedRoute
  ) {
    this.token = this._userService.getToken()
    this.hotelModel = new Hotel('','','','','',0,0,[{number: 0, numberBeds: 0, status: '',price: 0}],'','')
    this.eventModelGet = new Event('','','','','','','')
    this.eventModelAdd = new Event('','','','','','','')
    this.identity = this._userService.getIdentity()
   }

  ngOnInit(): void {
    this._activetedRoute.paramMap.subscribe(dataRoute => {
      this.idHotelRoute = dataRoute.get('idHotel')
    })
    this.getHotelID(this.idHotelRoute)
    this.getEvents(this.idHotelRoute)
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

  toggleModal(){
    this.showModal = !this.showModal;
  }

  toggleModalE(){
    this.showModalE = !this.showModalE;
  }


}
