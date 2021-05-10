export class Hotel {
  constructor(
    public _id: String,
    public name: String,
    public address: String,
    public phoneNumber: String,
    public description: String,
    public popularity: Number,
    public numberOfRooms: Number,
    public bedrooms: [{
      number: Number,
      numberBeds: Number,
      status: String,
      price: Number
    }],
    public imgLink: String,
    public idAdminHotel: String
  ){}
}
