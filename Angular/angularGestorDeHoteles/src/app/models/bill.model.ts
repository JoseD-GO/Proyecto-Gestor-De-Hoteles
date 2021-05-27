export class Bill {
  constructor(
    public _id: String,
    public idUser: String,
    public dateIn: String,
    public dateOut: String,
    public idReservation: String,
    public idRoom: String,
    public idHotel: String,
    public idAdminHotel: String,
    public services: [],
    public total: Number
  ){}
}
