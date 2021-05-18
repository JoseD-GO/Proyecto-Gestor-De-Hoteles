import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event.model';
import { Hotel } from 'src/app/models/hotel.model';
import { EventService } from 'src/app/services/event.service';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details-hotel',
  templateUrl: './details-hotel.component.html',
  styleUrls: ['./details-hotel.component.scss'],
  providers: [ UserService, HotelService, EventService]
})
export class DetailsHotelComponent implements OnInit {
  public hotelModel;
  public events
  public token;
  public idHotelRoute: string;
  public eventModelGet: Event;
  public click = '1';
  public showModal = false;

  constructor(
    public _userService: UserService,
    public _hotelService: HotelService,
    public _eventService: EventService,
    public _activetedRoute: ActivatedRoute
  ) {
    this.token = this._userService.getToken()
    this.hotelModel = new Hotel('','','','','',0,0,[{number: 0, numberBeds: 0, status: '',price: 0}],'','')
    this.eventModelGet = new Event('','','','','','')
   }

  ngOnInit(): void {
    this._activetedRoute.paramMap.subscribe(dataRoute => {
      this.idHotelRoute = dataRoute.get('idHotel')
    })
    this.getHotelID(this.idHotelRoute)
    this.getEvents(this.idHotelRoute)
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

  toggleModal(){
    this.showModal = !this.showModal;
  }

}
