'use strict'

const mongoose = require("mongoose")
var Schema = mongoose.Schema

var HotelSchema = Schema({
    name: String,
    address: String,
    phoneNumber: String,
    description: String,
    popularity: { type: Number, default: 0 },
    numberOfRooms: { type: Number, default: 0 },
    bedrooms:[{
        name: String,
        number: { type: Number, default: 0 },
        numberBeds: { type: Number, default: 0 },
        description: String,
        status: Boolean,
        price: { type: Number, default: 0 }
    }],
    imgLink: String,
    idAdminHotel: { type: Schema.Types.ObjectId, ref: 'Users' }
})

module.exports = mongoose.model('Hotels', HotelSchema)