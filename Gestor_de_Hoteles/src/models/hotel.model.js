'use strict'

const mongoose = require("mongoose")
var Schema = mongoose.Schema

var HotelSchema = Schema({
    name: String,
    direction: String,
    phoneNumber: String,
    description: String,
    popularity: { type: Number, default: 0 },
    //numberOfRooms: { type: Number, default: 0 },
    bedrooms:[{
        number: { type: Number, default: 0 },
        numberBeds: { type: Number, default: 0 },
        status: String,
        price: { type: Number, default: 0 }
    }],
    idAdminHotel: { type: Schema.Types.ObjectId, ref: 'Users' }
})

module.exports = mongoose.model('Hotels', HotelSchema)