'use strict'

const mongoose = require("mongoose")
var Schema = mongoose.Schema

var EventSchema = Schema({
    name: String,
    descrioption: String,
    date: Date,
    idEventTyoe: { type: Schema.Types.ObjectId, ref: 'EventsType' },
    idHotel: { type: Schema.Types.ObjectId, ref: 'Hotels' }
})

module.exports = mongoose.model('Events', EventSchema)