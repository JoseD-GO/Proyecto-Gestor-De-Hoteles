'use strict'

const mongoose = require("mongoose")
var Schema = mongoose.Schema

var EventTypeSchema = Schema({
    name: String
})

module.exports = mongoose.model('EventsType', EventTypeSchema)