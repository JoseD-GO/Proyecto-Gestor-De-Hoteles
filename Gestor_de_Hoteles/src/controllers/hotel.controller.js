'use strict'

const hotelModel = require('../models/hotel.model')

const Hotel = require('../models/hotel.model')
const Reservation = require('../models/reservation.model')
const Service = require('../models/service.model')
const pdf = require("html-pdf")

function addHotel(req,res){
    var hotelModel = new Hotel()
    var params = req.body

    if(req.user.rol != 'ROL_ADMIN') return res.status(500).send({ message: 'You dont have the permissions' })

    if(params.name && params.address && params.phoneNumber && params.description && params.imgLink && params.idAdminHotel){
        hotelModel.name = params.name
        hotelModel.address = params.address
        hotelModel.phoneNumber = params.phoneNumber
        hotelModel.description = params.description
        hotelModel.imgLink = params.imgLink
        hotelModel.idAdminHotel = params.idAdminHotel

        hotelModel.save((err, hotelSaved) =>{
            if(err) return res.status(500).send({ message: 'Error in the request' })
            if(!hotelSaved) return res.status(500).send({ message: 'Error saving the hotel' })
            return res.status(200).send({ hotelSaved })
        })
    }else {
        return res.status(500).send({ message: 'Missing data to enter' })
    }
}

function editHotel(req,res){
    var idHotel = req.params.idHotel
    var params = req.body

    if(req.user.rol === 'ROL_USER') return res.status(500).send({ message: 'You dont have the permissions' })

    /*Hotel.findById(idHotel, (err, hotelFound) => {
        if(req.user.sub != hotelFound.idAdminHotel) return res.status(500).send({ message: 'You dont have the permissions' })
        Hotel.findByIdAndUpdate(idHotel, params, { new: true, useFindAndModify: false }, ( err, editedHotel ) => {
            if(err) return res.status(500).send({ message: 'Error in the request' })
            if(!editedHotel) return res.status(500).send({ message: 'Error editing the hotel' })
            return res.status(200).send({ editedHotel })
        })
    })*/

    Hotel.findByIdAndUpdate(idHotel, params, { new: true, useFindAndModify: false }, ( err, editedHotel ) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!editedHotel) return res.status(500).send({ message: 'Error editing the hotel' })
        return res.status(200).send({ editedHotel })
    })
}

function deleteHotel(req,res){
    var idHotel = req.params.idHotel

    if(req.user.rol === 'ROL_USER') return res.status(500).send({ message: 'You dont have the permissions' })

    Hotel.findByIdAndDelete(idHotel, (err, deletedHotel) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!deletedHotel) return res.status(500).send({ message: 'Error deleting the hotel' })
        return res.status(200).send({ deletedHotel })
    })
}

function addRoom(req,res){
    var hotelID = req.params.IdHotel
    var params = req.body

    if(req.user.rol === 'ROL_USER') return res.status(500).send({ message: 'You dont have the permissions' })

    Hotel.findById(hotelID, (err, hotelFounded) =>{
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!hotelFounded) return res.status(500).send({ message: 'Hotel not founded' })

        Hotel.findByIdAndUpdate(hotelID, {$inc:{ numberOfRooms: +1 }}, { new: true, useFindAndModify: false }, (err, hotelFound) =>{
            if(err) return res.status(500).send({ message: 'Error in the request' })
            var numberA =  hotelFound.numberOfRooms;
            Hotel.findByIdAndUpdate(hotelID, { $push: { bedrooms: { name: params.name, number: numberA, numberBeds: params.numberBeds, description: params.description, price: params.price } } },
                {new: true, useFindAndModify: false}, (err, addedRoom) => {
                    if(err) return res.status(500).send({ message: 'Error in the request' })
                    if(!addedRoom) return res.status(500).send({ message: 'Error savig room' })
                    return res.status(200).send({ addedRoom })
            })
        })
    })
}

function getRoomsHotel(req,res){
    var hotelID = req.params.IdHotel;

    Hotel.findById(hotelID, (err, hotelFound) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!hotelFound) return res.status(500).send({ message: 'Hotel not founded' })

        return res.status(200).send( {RoomsFound: hotelFound.bedrooms} )
    })
}

function getHotels(req,res){
    Hotel.find((err, hotelsFound) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!hotelsFound) return res.status(500).send({ message: 'No hotel was found' })

        return res.status(200).send( {hotelsFound} )
    })
}

function getHotelID(req,res){
    var idHotel = req.params.idHotel
    Hotel.findById(idHotel).populate('idAdminHotel',  'name lastname username image').exec((err, hotelFound) =>{
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!hotelFound) return res.status(500).send({ message: 'No hotel was found' })
        return res.status(200).send({ hotelFound })
    })
}

function getHotelIdAdminHotel(req,res){
    var idAdminHotel = req.params.idAdminHotel

    if(req.user.rol != 'ROL_ADMIN_HOTEL') return res.status(500).send({ message: 'You dont have the permissions' })

    Hotel.find({idAdminHotel: idAdminHotel}).populate('idAdminHotel',  'name lastname username image').exec((err, hotelFound) =>{
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!hotelFound) return res.status(500).send({ message: 'No hotel was found' })
        return res.status(200).send({ hotelFound })
    })
}

function getPopularHotels(req,res){
    Hotel.aggregate([
        {
            $project: { name: 1, address: 1, phoneNumber: 1, description: 1, imgLink: 1, idAdminHotel: 1, popularity: 1 }
        },
        {
            $sort: { popularity: -1 }
        },
        {
            $limit: 4
        }
    ]).exec((err, hotelsFound) => {
        return res.status(200).send({ hotelsFound })
    })

}

function createPDF(req,res){

    var idHotel = req.params.idHotel;
    var content='';
    var save=[];

    Hotel.findById(idHotel, (err, hotelFound) => {
        
        var contentC=`<style>
        body {
            padding: 8px;
        }
        </style>
        <body>
        <div style="text-align: center;">
        <img style="border-radius: 5px;"  width="500"  src="${hotelFound.imgLink}">
        </div>
        <h1 style="font-size: 50px; text-align: center;font-family: 'Verdana', Courier, monospace;">${hotelFound.name}</h1>
        <hr>
        <h1 style="font-size:  25px;text-align: left;font-family: 'Verdana', Courier, monospace;">Dirección:</h1>
        <h2 style="font-size:  20px;text-align: left;font-family: 'Verdana', Courier, monospace;">${hotelFound.address}</h2>
        <h1 style="font-size:  25px;text-align: left;font-family: 'Verdana', Courier, monospace;">Teléfono:</h1>
        <h2 style="font-size:  20px;text-align: left;font-family: 'Verdana', Courier, monospace;">${hotelFound.phoneNumber}</h2>
        <hr>
        <h1 style="font-size:  25px;text-align: center;font-family: 'Verdana', Courier, monospace;">Servicios</h1>
        <table style="margin-left: auto;margin-right: auto; font-size: 15px; width: 700px;
     border-bottom: 2px black; border-collapse: collapse;font-family: 'Verdana', Courier, monospace; text-align: center;display: block;" border="1">
        <tr style="background-color: #e0e0e0;">
            <th>Nombre</th>
            <th>Precio</th>
        </tr>`;

        Service.find({idHotel: idHotel},(err,servicesFound)=>{

            for (let i = 0; i < servicesFound.length; i++) {
                
                save[i]=`<tr>
                    <td>${servicesFound[i].name}</td>
                    <td>${servicesFound[i].price}</td>
                </tr>`;
                content+=save[i];
            }

            content=contentC+content+`</table></body>`

            pdf.create(content).toFile(`./Servicios-Hotel-${hotelFound.name}.pdf`,function(err,res){
                if(err){
                    return console.log(err)
                }else{
                    return console.log(res)
                }
            })
    
            return res.status(200).send({mensaje: 'PDF created'})

        })        

        
    })

}


module.exports = {
    addHotel,
    editHotel,
    deleteHotel,
    addRoom,
    getRoomsHotel,
    getHotels,
    getHotelID,
    getHotelIdAdminHotel,
    getPopularHotels,
    createPDF
}