'use strict'

const mongoose = require("mongoose")
var Schema = mongoose.Schema

var BillSchema = Schema({
    idUser: { type: Schema.Types.ObjectId, ref: 'Users' },
    dateIn: Date,
    dateOut: Date,
    idReservation: { type: Schema.Types.ObjectId, ref: 'Reservations' },
    idRoom: { type: Schema.Types.ObjectId, ref: 'Hotels.bedrooms._id' },
    idHotel: { type: Schema.Types.ObjectId, ref: 'Hotels' },
    idAdminHotel: { type: Schema.Types.ObjectId, ref: 'Users' },
    services: [
        { type: Schema.Types.ObjectId, ref: 'Services' }
    ],
    total: { type: Number, default: 0 }
})

module.exports = mongoose.model('Bills', BillSchema)