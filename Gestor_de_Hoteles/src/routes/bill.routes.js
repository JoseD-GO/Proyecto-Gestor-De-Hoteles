'use strict'

const express = require("express")
const billController = require('../controllers/bill.controller')
const md_authentication = require('../middlewares/authenticated')

var api = express.Router()

api.get('/createBill/:idReservation', md_authentication.ensureAuth, billController.createBill)
api.get('/viewBill/:idBill', md_authentication.ensureAuth, billController.viewBill)
api.get('/getBillsUser/:idUser', md_authentication.ensureAuth, billController.getBillsUser)
api.get('/getBillsHotel/:idHotel', md_authentication.ensureAuth, billController.getBillHotel)

module.exports = api