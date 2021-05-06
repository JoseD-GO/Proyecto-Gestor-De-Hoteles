'use strict'

const mongoose = require("mongoose")
var Schema = mongoose.Schema

var UserSchema = Schema({
    name: String,
    lastname: String,
    email: String,
    user: String,
    password: String,
    rol: String,
    image: String
})

module.exports = mongoose.model('Users', UserSchema)