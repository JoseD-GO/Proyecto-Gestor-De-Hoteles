'use strict'

const serviceModel = require('../models/service.model')
const Service = require('../models/service.model')

function addService(req,res){
    var serviceModel = new Service();
    var params = req.body;

    if(req.user.rol == 'ROL_ADMIN' || req.user.rol == 'ROL_ADMIN_HOTEL') {
        if(params.name && params.description && params.price && params.idHotel){
            serviceModel.name = params.name;
            serviceModel.description = params.description;
            serviceModel.price = params.price;
            serviceModel.idHotel = params.idHotel;

            serviceModel.save((err, serviceSaved) => {
                if(err) return res.status(500).send({ message: 'Error in the request' })
                if(!serviceSaved) return res.status(500).send({ message: 'Error savig the service' })
                return res.status(200).send({ serviceSaved })
            })
        }else {
            return res.status(500).send({ message: 'Missing data to enter' })
        }
        
    }else {
        return res.status(500).send({ message: 'You dont have the permissions' })
    }
}

function editService(req,res){
    var idService = req.params.idService;
    var params = req.body;

    delete params.idHotel;

    if(req.user.rol == 'ROL_ADMIN' || req.user.rol == 'ROL_ADMIN_HOTEL') {
        serviceModel.findByIdAndUpdate(idService, params, {new: true, useFindAndModify: false}, (err, editedService) => {
            if(err) return res.status(500).send({ message: 'Error in the request' })
                if(!editedService) return res.status(500).send({ message: 'Error editing the service' })
                return res.status(200).send({ editedService })
        })
    }else {
        return res.status(500).send({ message: 'You dont have the permissions' })
    }
}

function getServicesHotel(req,res){
    var idHotel = req.params.idHotel

    Service.find({idHotel: idHotel}, (err, servicesFound) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!servicesFound) return res.status(500).send({ message: 'Error getting the services' })
        return res.status(200).send({ servicesFound })
    })    
}

function getServicesID(req,res){
    var idService = req.params.idService;

    Service.findById(idService, (err, serviceFound) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!serviceFound) return res.status(500).send({ message: 'Error getting the service' })
        return res.status(200).send({ serviceFound })
    })
}

module.exports = {
    addService,
    editService,
    getServicesHotel,
    getServicesID
}