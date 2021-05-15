import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details-hotel',
  templateUrl: './details-hotel.component.html',
  styleUrls: ['./details-hotel.component.scss'],
  providers: [ UserService, HotelService]
})
export class DetailsHotelComponent implements OnInit {
  public hotelModel;
  public token;
  public idHotelRoute: string;

  constructor(
    public _userService: UserService,
    public _hotelService: HotelService,
    public _activetedRoute: ActivatedRoute
  ) {
    this.token = this._userService.getToken()
    this.hotelModel = new Hotel('','','','','',0,0,[{number: 0, numberBeds: 0, status: '',price: 0}],'','')
   }

  ngOnInit(): void {
    this._activetedRoute.paramMap.subscribe(dataRoute => {
      this.idHotelRoute = dataRoute.get('idHotel')
    })
    this.getHotelID(this.idHotelRoute)
  }

  getHotelID(idHotel){
    this._hotelService.getHotelID(this.token, idHotel).subscribe(
      response => {
        this.hotelModel = response.hotelFound
        console.log(this.hotelModel)
      }
    )
  }

}
