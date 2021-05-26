'use strict'

const reservationModel = require("../models/reservation.model");
const Hotel = require('../models/hotel.model')

const Reservation = require("../models/reservation.model");

function addReserve(req,res){
    var idRoom = req.params.idRoom;
    var reservationModel = new Reservation();
    var params = req.body;
    var cont = 0;

    if(req.user.rol != 'ROL_USER') return res.status(500).send({ message: 'You dont have the permissions' })

    if(params.dateIn && params.dateOut){
        var dateIn = new Date(params.dateIn)
        var dateOut = new Date(params.dateOut)

        if(dateIn.getTime() < Date.now() || dateOut.getTime() < dateIn.getTime() ) return res.status(500).send({ message: 'Error cant enter an old date' })

        reservationModel.idUser = req.user.sub;
        reservationModel.dateIn = dateIn;
        reservationModel.dateOut = dateOut;
        reservationModel.idRoom = idRoom;

        Hotel.findOne({"bedrooms._id": idRoom}, (err, hotelFound) => {
            if(err) return res.status(500).send({ message: 'Error in the request' })

            reservationModel.idHotel = hotelFound._id;

            Reservation.find({ idRoom: idRoom }, (err, reservationFound) => {
                if(err) return res.status(500).send({ message: 'Error in the request' })
    
                for (let i = 0; i < reservationFound.length; i++) {
                    
                    if(dateIn.getTime() > reservationFound[i].dateIn.getTime() &&  dateIn.getTime() > reservationFound[i].dateOut.getTime() || dateIn.getTime() < reservationFound[i].dateIn.getTime() && dateOut.getTime() < reservationFound[i].dateIn.getTime() ){
                        cont++;
                    }
                    
                }
    
                if(cont === reservationFound.length){
    
                    Hotel.findOneAndUpdate({"bedrooms._id": idRoom},{"bedrooms.$.status": true}, { new: true, useFindAndModify: false }, (err, editedRoom) => {
                        if(err) return res.status(500).send({ message: 'Error in the request' })
                        reservationModel.save((err, reservationSaved) =>{
                            if(err) return res.status(500).send({ message: 'Error in the request' })
                            if(!reservationSaved) return res.status(500).send({ message: 'Error savig the reservation' })
                            return res.status(200).send({ reservationSaved })
                        })
                    })
    
                }else {
                    return res.status(500).send({ message: 'Room already reserved' })
                }
            })

        })

    }else {
        return res.status(500).send({ message: 'Missing data to enter' })
    }
}

function cancelReservation(req,res){
    var idReservation = req.params.idReservation

    if(req.user.rol === 'ROL_ADMIN') return res.status(500).send({ message: 'You dont have the permissions' })

    Reservation.findById(idReservation, (err, reservationFound) => {
        
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!reservationFound) return res.status(500).send({ message: 'Error getting the reservation' })

        Hotel.findOneAndUpdate({"bedrooms._id": reservationFound.idRoom},{"bedrooms.$.status": false}, { new: true, useFindAndModify: false }, (err, editedRoom) => {
            if(err) if(err) return res.status(500).send({ message: 'Error in the request' })

            Reservation.findByIdAndDelete(idReservation, (err, deletedReservation) => {
                if(err) return res.status(500).send({ message: 'Error in the request' })
                if(!deletedReservation) return res.status(500).send({ message: 'Error getting the reservation' })
                return res.status(200).send({ deletedReservation })
            })
        })

    })
}

function getReservationUser(req,res){
    var idUser = req.params.idUser;

    if(req.user.rol === 'ROL_ADMIN') return res.status(500).send({ message: 'You dont have the permissions' })

    Reservation.find({idUser: idUser}, (err, reservationsFoudn) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!reservationsFoudn) return res.status(500).send({ message: 'Error getting the reservation' })

        return res.status(200).send({ reservationsFoudn })
    })
}

function getReservations(req,res){
    var idHotel = req.params.idHotel
    if(req.user.rol != 'ROL_ADMIN_HOTEL') return res.status(500).send({ message: 'You dont have the permissions' })

    Reservation.find({idHotel: idHotel}).populate('idHotel idUser', 'name lastname address phoneNumber username').exec((err, reservationsFound) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!reservationsFound) return res.status(500).send({ message: 'Error getting the reservation' })

        return res.status(200).send({ reservationsFound })
    })
}

module.exports = {
    addReserve,
    cancelReservation,
    getReservationUser,
    getReservations
}