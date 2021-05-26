'use strict'

const express = require("express")
const reservationController = require('../controllers/reservation.controller')
const md_authentication = require('../middlewares/authenticated')

var api = express.Router()

api.post('/addReserve/:idRoom',md_authentication.ensureAuth, reservationController.addReserve)

module.exports = api