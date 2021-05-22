'use strict'

const typeModel = require('../models/eventtype.model')

const Type = require('../models/eventtype.model')

function addEventType(req,res){
    var typeModel = new Type();
    var params = req.body

    if(req.user.rol == 'ROL_ADMIN' || req.user.rol == 'ROL_ADMIN_HOTEL') {
        if(params.name){
            typeModel.name = params.name
    
            typeModel.save((err, typeSaved) => {
                if(err) return res.status(500).send({ message: 'Error in the request' })
                if(!typeSaved) return res.status(500).send({ message: 'Error savig the event type' })
    
                return res.status(200).send({ typeSaved })
            })
        }else {
            return res.status(500).send({ message: 'Missing data to enter' })
        }
    }else {
        return res.status(500).send({ message: 'You dont have the permissions' })
    }
}

function editEventType(req,res){
    var idType = req.params.idType;
    var params = req.body;

    if(req.user.rol == 'ROL_ADMIN' || req.user.rol == 'ROL_ADMIN_HOTEL') {
        typeModel.findByIdAndUpdate(idType, params, {new: true, useFindAndModify: false}, (err, editedType) =>{
            if(err) return res.status(500).send({ message: 'Error in the request' })
            if(!editedType) return res.status(500).send({ message: 'Error editing the event type' })

            return res.status(200).send({ editedType })
        })
    }else {
        return res.status(500).send({ message: 'You dont have the permissions' })
    }
}

function getEventsType(req,res){
    if(req.user.rol == 'ROL_ADMIN' || req.user.rol == 'ROL_ADMIN_HOTEL') {
        Type.find((err, typesFounds) => {
            if(err) return res.status(500).send({ message: 'Error in the request' })
            if(!typesFounds) return res.status(500).send({ message: 'Error editing the event type' })

            return res.status(200).send({ typesFounds })
        })
    }else {
        return res.status(500).send({ message: 'You dont have the permissions' })
    }
}

function getEventTypeID(req,res){
    var idType = req.params.idType;
    if(req.user.rol == 'ROL_ADMIN' || req.user.rol == 'ROL_ADMIN_HOTEL') {
        Type.findById(idType,(err, typeFound) => {
            if(err) return res.status(500).send({ message: 'Error in the request' })
            if(!typeFound) return res.status(500).send({ message: 'Error editing the event type' })

            return res.status(200).send({ typeFound })
        })
    }else {
        return res.status(500).send({ message: 'You dont have the permissions' })
    }
}

module.exports = {
    addEventType,
    editEventType,
    getEventsType,
    getEventTypeID
}