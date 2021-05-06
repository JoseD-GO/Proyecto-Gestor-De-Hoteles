'use strict'

const hotelModel = require('../models/hotel.model')

const Hotel = require('../models/hotel.model')

function addHotel(req,res){
    var hotelModel = new Hotel()
    var params = req.body

    if(req.user.rol != 'ROL_ADMIN') return res.status(500).send({ message: 'You dont have the permissions' })

    if(params.name && params.direction && params.phoneNumber && params.description && params.idAdminHotel){
        hotelModel.name = params.name
        hotelModel.direction = params.direction
        hotelModel.phoneNumber = params.phoneNumber
        hotelModel.description = params.description
        hotelModel.idAdminHotel = params.idAdminHotel

        hotelModel.save((err, hotelSaved) =>{
            if(err) return res.status(500).send({ message: 'Error in the request' })
            if(!hotelSaved) return res.status(500).send({ message: 'Error savig the hotel' })
            return res.status(200).send({ hotelSaved })
        })
    }else {
        return res.status(500).send({ message: 'Missing data to enter' })
    }
}

function addRoom(req,res){
    var hotelID = req.params.IdHotel
    var params = req.body

    if(req.user.rol != 'ROL_ADMIN') return res.status(500).send({ message: 'You dont have the permissions' })

    Hotel.findByIdAndUpdate(hotelID, { $push: { bedrooms: { numberBeds: params.numberBeds, status: params.status, price: params.price } } },
        {new: true, useFindAndModify: false}, (err, addedRoom) => {
            if(err) return res.status(500).send({ message: 'Error in the request' })
            if(!addedRoom) return res.status(500).send({ message: 'Error savig room' })
            return res.status(200).send({ addedRoom })
    })
}

module.exports = {
    addHotel,
    addRoom
}