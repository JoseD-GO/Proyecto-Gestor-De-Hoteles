import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { Bill } from "../../models/bill.model";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bill-reservation',
  templateUrl: './bill-reservation.component.html',
  styleUrls: ['./bill-reservation.component.scss'],
  providers: [BillService, UserService, ReservationService]
})
export class BillReservationComponent implements OnInit {
  public token;
  public identity;
  public idBillRoute;
  public billModel;

  constructor(
    public _userService: UserService,
    public _billService: BillService,
    public _reservationService: ReservationService,
    public _activetedRoute: ActivatedRoute
  ) {
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()
    this.billModel = new Bill('','','','','','','','',[],0)
  }

  ngOnInit(): void {
    this._activetedRoute.paramMap.subscribe(dataRoute => {
      this.idBillRoute = dataRoute.get('idBill')
    })
    this.getBill(this.idBillRoute)
  }

  getBill(idBill){
    this._billService.viewBills(idBill, this.token).subscribe(
      response => {
        this.billModel = response.billFound
      }
    )
  }

}
