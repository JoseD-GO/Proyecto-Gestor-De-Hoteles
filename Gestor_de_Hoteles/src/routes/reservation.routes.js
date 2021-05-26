'use strict'

const express = require("express")
const reservationController = require('../controllers/reservation.controller')
const md_authentication = require('../middlewares/authenticated')

var api = express.Router()

api.post('/addReserve/:idRoom',md_authentication.ensureAuth, reservationController.addReserve)
api.delete('/cancelReservation/:idReservation', md_authentication.ensureAuth, reservationController.cancelReservation)
api.get('/getReservationsUser/:idUser', md_authentication.ensureAuth, reservationController.getReservationUser)
api.get('/getReservations/:idHotel', md_authentication.ensureAuth, reservationController.getReservations)

module.exports = api