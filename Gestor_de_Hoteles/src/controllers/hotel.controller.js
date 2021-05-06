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

    Hotel.findById(hotelID, (err, hotelFounded) =>{
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!hotelFounded) return res.status(500).send({ message: 'Hotel not founded' })

        Hotel.findByIdAndUpdate(hotelID, {$inc:{ numberOfRooms: +1 }}, { new: true, useFindAndModify: false }, (err, hotelFound) =>{
            if(err) return res.status(500).send({ message: 'Error in the request' })
            var numberA =  hotelFound.numberOfRooms;
            Hotel.findByIdAndUpdate(hotelID, { $push: { bedrooms: { number: numberA, numberBeds: params.numberBeds, price: params.price } } },
                {new: true, useFindAndModify: false}, (err, addedRoom) => {
                    if(err) return res.status(500).send({ message: 'Error in the request' })
                    if(!addedRoom) return res.status(500).send({ message: 'Error savig room' })
                    return res.status(200).send({ addedRoom })
            })
        })
    })
}

module.exports = {
    addHotel,
    addRoom
}