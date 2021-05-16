'use strict'

const mongoose = require("mongoose")
var Schema = mongoose.Schema

var EventSchema = Schema({
    name: String,
    description: String,
    date: Date,
    duration: String,
    idEventType: { type: Schema.Types.ObjectId, ref: 'EventsType' },
    idHotel: { type: Schema.Types.ObjectId, ref: 'Hotels' }
})

module.exports = mongoose.model('Events', EventSchema)