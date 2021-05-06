'use strict'

const express = require("express")
const hotelController = require('../controllers/hotel.controller')
const md_authentication = require('../middlewares/authenticated')

var api = express.Router()

api.post('/addHotel',md_authentication.ensureAuth, hotelController.addHotel);
api.put('/addRoom/:IdHotel', md_authentication.ensureAuth, hotelController.addRoom);
api.get('/getRoomsHotel/:IdHotel', md_authentication.ensureAuth, hotelController.getRoomsHotel);
api.get('/getHotels', md_authentication.ensureAuth, hotelController.getHotels)

module.exports = api