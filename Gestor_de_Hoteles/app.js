'use strict'

const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const cors = require("cors")

const userController = require('./src/controllers/user.controller')

const user_routes = require('./src/routes/user.routes')
const hotel_routes = require('./src/routes/hotel.routes')
const type_routes = require('./src/routes/eventtype.routes')
const event_routes = require('./src/routes/event.routes')
const service_routes = require('./src/routes/service.routes')
const reservation_routes = require('./src/routes/reservation.routes')
const bill_routes = require('./src/routes/bill.routes')

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.use(cors())

app.use('/api', user_routes)
app.use('/api', hotel_routes)
app.use('/api', type_routes)
app.use('/api', event_routes)
app.use('/api', service_routes)
app.use('/api', reservation_routes)
app.use('/api', bill_routes)

userController.createAdmin()

module.exports = app