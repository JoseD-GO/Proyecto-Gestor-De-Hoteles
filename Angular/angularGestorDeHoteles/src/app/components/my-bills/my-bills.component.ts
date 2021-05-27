import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-bills',
  templateUrl: './my-bills.component.html',
  styleUrls: ['./my-bills.component.scss'],
  providers: [BillService, UserService]
})
export class MyBillsComponent implements OnInit {
  public token;
  public identity;
  public billModel;

  constructor(public _userService: UserService,
    public _billService: BillService) {
      this.token = this._userService.getToken()
      this.identity = this._userService.getIdentity()
  }

  ngOnInit(): void {
    this.getBillsUser(this.identity._id)
  }

  getBillsUser(idUser){
    this._billService.getBillUser(this.token, idUser).subscribe(
      response => {
        this.billModel = response.billsFound;
      }
    )
  }

}
