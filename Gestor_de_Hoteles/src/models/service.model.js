'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ServiceSchema = Schema({
    name: String,
    description: String,
    price: Number,
    idHotel: { type: Schema.Types.ObjectId, ref: 'Hotels' }
})

module.exports = mongoose.model('Services', ServiceSchema)