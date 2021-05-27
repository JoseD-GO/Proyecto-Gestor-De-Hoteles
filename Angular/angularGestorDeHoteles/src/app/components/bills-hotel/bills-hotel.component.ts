import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bills-hotel',
  templateUrl: './bills-hotel.component.html',
  styleUrls: ['./bills-hotel.component.scss'],
  providers: [BillService, UserService]
})
export class BillsHotelComponent implements OnInit {
  public token;
  public identity;
  public billModel;
  public idHotelRoute;

  constructor(public _userService: UserService,
    public _billService: BillService,
    public _activetedRoute: ActivatedRoute) {
      this.token = this._userService.getToken()
      this.identity = this._userService.getIdentity()
  }

  ngOnInit(): void {
    this._activetedRoute.paramMap.subscribe(dataRoute => {
      this.idHotelRoute = dataRoute.get('idHotel')
    })
    this.getBillsHotel(this.idHotelRoute)
  }

  getBillsHotel(idHotel){
    this._billService.getBillsHotel(this.token, idHotel).subscribe(
      response => {
        this.billModel = response.billsFound;
      }
    )
  }

}
