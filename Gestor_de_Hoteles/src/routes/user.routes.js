'use strict'

const express = require("express")
const userController = require('../controllers/user.controller')
const md_authentication = require('../middlewares/authenticated')

var api = express.Router()

api.post('/login', userController.login)
api.post('/registerAdminHotel', md_authentication.ensureAuth, userController.registerAdminHotel)
api.post('/registerUser', userController.registerUser)
api.put('/editUser', md_authentication.ensureAuth, userController.editUser)
api.delete('/deleteUser', md_authentication.ensureAuth, userController.deleteUser)
api.get('/registeredUsers', md_authentication.ensureAuth, userController.registeredUsers)
api.get('/getUsersAdminHotel', md_authentication.ensureAuth, userController.getUsersAdminHotel)

module.exports = api