export class Reservation{
  constructor(
    public _id: String,
    public idUser: String,
    public dateIn: String,
    public dateOut: String,
    public idRoom: String,
    public idHotel: String
  ){}
}
