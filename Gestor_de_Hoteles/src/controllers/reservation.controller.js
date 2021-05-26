'use strict'

const reservationModel = require("../models/reservation.model");

const Reservation = require("../models/reservation.model");

function addReserve(req,res){
    var reservationModel = new Reservation();
    var params = req.body;

    if(req.user.rol != 'ROL_USER') return res.status(500).send({ message: 'You dont have the permissions' })

    if(params.datein && params.dateOut && params.idRoom){

        

    }else {
        return res.status(500).send({ message: 'Missing data to enter' })
    }
}