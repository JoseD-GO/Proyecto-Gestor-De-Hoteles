'use strict'

const express = require("express")
const eventController = require('../controllers/event.controller')
const md_authentication = require('../middlewares/authenticated')

var api = express.Router()

api.post('/addEvent', md_authentication.ensureAuth, eventController.addEvent);
api.put('/editEvent/:idEvent', md_authentication.ensureAuth, eventController.editEvent);
api.get('/getEventsHotel/:idHotel', md_authentication.ensureAuth, eventController.getEventsHotel)

module.exports = api;