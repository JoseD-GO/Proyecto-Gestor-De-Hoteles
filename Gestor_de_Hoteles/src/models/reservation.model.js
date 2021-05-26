'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var ReservationSchema = Schema({
    idUser: { type: Schema.Types.ObjectId, ref: 'Users' },
    dateIn: Date,
    dateOut: Date,
    idRoom:  { type: Schema.Types.ObjectId, ref: 'Hotels.bedrooms._id' },
    idHotel: { type: Schema.Types.ObjectId, ref: 'Hotels' }
})

module.exports = mongoose.model('Reservations', ReservationSchema)