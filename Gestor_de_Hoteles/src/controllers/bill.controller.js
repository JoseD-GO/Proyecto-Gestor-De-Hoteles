'use strict'

const billModel = require('../models/bill.model')

const Bill = require('../models/bill.model')
const Reservation = require('../models/reservation.model')
const Hotel = require('../models/hotel.model')
const Service = require('../models/service.model')

/*function createBill(req,res){
    var idReservation = req.params.idReservation;
    var billModel = new Bill()
    var priceRoom 
    var priceServices 
    var total = 0

    if(req.user.rol != 'ROL_ADMIN_HOTEL') return res.status(500).send({ message: 'You dont have the permissions' })

    Reservation.findById(idReservation, (err, reservationFound) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!reservationFound) return res.status(500).send({ message: 'Reservation could not be found' })

        billModel.idUser = reservationFound.idUser;
        billModel.dateIn = reservationFound.dateIn;
        billModel.dateOut = reservationFound.dateOut;
        billModel.idReservation = reservationFound._id
        billModel.idRoom = reservationFound.idRoom;

        Hotel.find({"bedrooms._id":reservationFound.idRoom}, (err, roomFound) => {
            if(err) return res.status(500).send({ message: 'Error in the request' })
            billModel.nameRoom = roomFound.name;
            priceRoom = roomFound.price
            console.log(roomFound.price);

            Hotel.findById(reservationFound.idHotel, (err, hotelFound) => {
                if(err) return res.status(500).send({ message: 'Error in the request' })
                billModel.idAdminHotel = hotelFound.idAdminHotel
                billModel.idHotel = reservationFound.idHotel

                Service.find({ idHotel: reservationFound.idHotel }, (err, servicesFound) => {
                    if(err) return res.status(500).send({ message: 'Error in the request' })

                    for (let i = 0; i < servicesFound.length; i++) {
                        priceServices += servicesFound[i].price
                        billModel.services.push(servicesFound[i]._id)
                    }   
                })

            })
        })
        console.log(priceRoom);
        console.log(priceServices);

        total = priceRoom + priceServices


        billModel.total = total;

        billModel.save((err, billSaved) => {
            if(err) return res.status(500).send({ message: 'Error in the request' })
            if(!billSaved) return res.status(500).send({ message: 'Error saving the bill' })
            return res.status(200).send({ billSaved })
        })
    })
}*/

function createBill(req,res){
    var idReservation = req.params.idReservation;
    var billModel = new Bill()

    if(req.user.rol != 'ROL_ADMIN_HOTEL') return res.status(500).send({ message: 'You dont have the permissions' })

    //Bill.findOne({idReservation: idReservation}, (err, billFound) => {

        //if(!billFound){
            Reservation.findById(idReservation, (err, reservationFound) => {
                
                Hotel.findOne({"bedrooms._id": reservationFound.idRoom}, (err, hotelFound) => {

                    Service.find({idHotel: hotelFound._id}, (err, servicesFound) => {
                        var total = 0

                        for (let i = 0; i < hotelFound.bedrooms.length; i++) {
                            
                            if(reservationFound.idRoom.equals(hotelFound.bedrooms[i]._id)){
                                total += hotelFound.bedrooms[i].price
                            }
                            
                        }

                        for (let i = 0; i < servicesFound.length; i++) {
                            total += servicesFound[i].price

                            billModel.services.push(servicesFound[i]._id)
                            
                        }

                        Hotel.findByIdAndUpdate(reservationFound.idHotel, {$inc: { popularity: +1 }}, { new: true, useFindAndModify: false }, (errr, hotelIncrement) => {
                            if(err) return res.status(500).send({ message: 'Error in the request' })
                            if(!hotelIncrement) return res.status(500).send({ message: 'Error' })
                            billModel.idUser = reservationFound.idUser;
                            billModel.dateIn = reservationFound.dateIn;
                            billModel.dateOut = reservationFound.dateOut;
                            billModel.idReservation = idReservation;
                            billModel.idRoom = reservationFound.idRoom;
                            billModel.idHotel = hotelFound._id;
                            billModel.idAdminHotel = hotelFound.idAdminHotel;
                            billModel.total = total

                            billModel.save((err, billSaved) => {
                                if(err) return res.status(500).send({ message: 'Error in the request' })
                                if(!billSaved) return res.status(500).send({ message: 'Error saving the bill' })
                                return res.status(200).send({ billSaved })
                            })

                        } )


                        Reservation.findByIdAndDelete(idReservation, (err, reservationDeleted) => {
                            if(err) return res.status(500).send({ message: 'Error in the request' })
                            if(!reservationDeleted) return res.status(500).send({ message: 'Error deleting the bill' })
                        })

                    })

                })
            })
        /*}else {
            return res.status(500).send({ message: 'Invoice for this reservation already created' })
        }*/
    //})


}

function viewBill(req,res){
    var idBill = req.params.idBill;

    Bill.findById(idBill).populate('services idHotel idUser idAdminHotel', 'name lastname username price address description').exec((err, billFound) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!billFound) return res.status(500).send({ message: 'Error getting the bill' })
        return res.status(200).send({ billFound })
    })
}

function getBillsUser(req,res){
    var idUser = req.params.idUser;

    Bill.find({idUser: idUser}).populate('services idHotel idUser idAdminHotel', 'name lastname username price address').exec((err, billsFound)=> {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!billsFound) return res.status(500).send({ message: 'Error saving the bill' })
        return res.status(200).send({ billsFound })
    })
}

function getBillHotel(req,res){
    var idHotel = req.params.idHotel

    Bill.find({idHotel: idHotel}).populate('services idHotel idUser idAdminHotel', 'name lastname username price address').exec((err, billsFound)=> {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!billsFound) return res.status(500).send({ message: 'Error saving the bill' })
        return res.status(200).send({ billsFound })
    })
}

module.exports = {
    createBill,
    viewBill,
    getBillsUser,
    getBillHotel
}

