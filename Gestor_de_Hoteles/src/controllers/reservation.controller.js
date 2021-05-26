'use strict'

const reservationModel = require("../models/reservation.model");

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

        Reservation.find({ idRoom: idRoom }, (err, reservationFound) => {
            if(err) return res.status(500).send({ message: 'Error in the request' })

            for (let i = 0; i < reservationFound.length; i++) {
                
                if(dateIn.getTime() > reservationFound[i].dateIn.getTime() &&  dateIn.getTime() > reservationFound[i].dateOut.getTime() || dateIn.getTime() < reservationFound[i].dateIn.getTime() && dateOut.getTime() < reservationFound[i].dateIn.getTime() ){
                    cont++;
                }
                
            }

            if(cont === reservationFound.length){
                reservationModel.save((err, reservationSaved) =>{
                    if(err) return res.status(500).send({ message: 'Error in the request' })
                    if(!reservationSaved) return res.status(500).send({ message: 'Error savig the reservation' })
                    return res.status(200).send({ reservationSaved })
                })
            }else {
                return res.status(500).send({ message: 'Room already reserved' })
            }
        })

    }else {
        return res.status(500).send({ message: 'Missing data to enter' })
    }
}

module.exports = {
    addReserve
}