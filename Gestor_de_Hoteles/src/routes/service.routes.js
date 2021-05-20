'use strict'

const express = require("express");
const serviceController = require('../controllers/service.controller');
const md_authentication = require('../middlewares/authenticated');

var api = express.Router()

api.post('/addService', md_authentication.ensureAuth, serviceController.addService);
api.put('/editService/:idService', md_authentication.ensureAuth, serviceController.editService);
api.get('/getServicesHotel/:idHotel', md_authentication.ensureAuth, serviceController.getServicesHotel)
api.get('/getServiceID/:idService', md_authentication.ensureAuth, serviceController.getServicesID)

module.exports = api;