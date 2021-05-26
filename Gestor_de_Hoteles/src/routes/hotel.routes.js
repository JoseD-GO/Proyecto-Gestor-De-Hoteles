'use strict'

const express = require("express")
const hotelController = require('../controllers/hotel.controller')
const md_authentication = require('../middlewares/authenticated')

var api = express.Router()

api.post('/addHotel',md_authentication.ensureAuth, hotelController.addHotel);
api.put('/addRoom/:IdHotel', md_authentication.ensureAuth, hotelController.addRoom);
api.get('/getRoomsHotel/:IdHotel', md_authentication.ensureAuth, hotelController.getRoomsHotel);
api.get('/getHotels', md_authentication.ensureAuth, hotelController.getHotels)
api.put('/editHotel/:idHotel', md_authentication.ensureAuth, hotelController.editHotel)
api.delete('/deleteHotel/:idHotel', md_authentication.ensureAuth, hotelController.deleteHotel)
api.get('/getHotelID/:idHotel', md_authentication.ensureAuth, hotelController.getHotelID)
api.get('/getPopularHotels', md_authentication.ensureAuth, hotelController.getPopularHotels)

module.exports = api