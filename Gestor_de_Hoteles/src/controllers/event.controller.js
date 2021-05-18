'use strict'

const eventModel = require('../models/event.model')

const Event = require('../models/event.model')

function addEvent(req,res){
    var eventModel = new Event()
    var params = req.body

    if(req.user.rol == 'ROL_ADMIN' || req.user.rol == 'ROL_ADMIN_HOTEL') {
        if(params.name && params.description && params.date && params.idEventType && params.idHotel){
            eventModel.name = params.name;
            eventModel.description = params.description;
            eventModel.date = params.date;
            eventModel.idEventType = params.idEventType;
            eventModel.idHotel = params.idHotel;

            eventModel.save((err, eventSaved) => {
                if(err) return res.status(500).send({ message: 'Error in the request' })
                if(!eventSaved) return res.status(500).send({ message: 'Error savig the event' })
                return res.status(200).send({ eventSaved })
            })
        }else {
            return res.status(500).send({ message: 'Missing data to enter' })
        }
        
    }else {
        return res.status(500).send({ message: 'You dont have the permissions' })
    }
}

function editEvent(req,res){
    var idEvent = req.params.idEvent;
    var params = req.body;

    delete params.idHotel;

    if(req.user.rol == 'ROL_ADMIN' || req.user.rol == 'ROL_ADMIN_HOTEL') {
        eventModel.findByIdAndUpdate(idEvent, params, {new: true, useFindAndModify: false}, (err, editedEvent) => {
            if(err) return res.status(500).send({ message: 'Error in the request' })
            if(!editedEvent) return res.status(500).send({ message: 'Error editing the event' })
            return res.status(200).send({ editedEvent })
        })
        
    }else {
        return res.status(500).send({ message: 'You dont have the permissions' })
    }
}

function getEventsHotel(req,res){
    var idHotel = req.params.idHotel;

    Event.find({idHotel: idHotel}, (err, eventsFound) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!eventsFound) return res.status(500).send({ message: 'Error getting the events' })
        return res.status(200).send({ eventsFound })
    })
}

function getEventID(req,res){
    var idEvent = req.params.idEvent;

    Event.findById(idEvent, (err, eventFound) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!eventFound) return res.status(500).send({ message: 'Error getting the events' })
        return res.status(200).send({ eventFound })
    })
}

module.exports = {
    addEvent,
    editEvent,
    getEventsHotel,
    getEventID
}