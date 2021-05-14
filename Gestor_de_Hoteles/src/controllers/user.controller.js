'use strict'
const userModel = require('../models/user.model')

const User = require('../models/user.model')
const bcrypt = require("bcrypt-nodejs")
const jwt = require('../services/user.jwt')

function createAdmin(req,res){
    var userModel = new User()
    var username = "ADMIN"
    var pass = "123456"
    var rol = "ROL_ADMIN"
    var email = "admin@email.com"

    if(username === "ADMIN" && pass === "123456" && rol === "ROL_ADMIN" && email === 'admin@email.com'){
        userModel.username = username
        userModel.password = pass
        userModel.rol = rol
        userModel.email = email
        userModel.image = null;

        User.find( { $or: [
            { username: userModel.username }
        ] } ).exec((err, userFound) => {
            if(err) return console.log("Error in the request")

            if(userFound && userFound.length >= 1){
                console.log(`User ${userModel.username} already exists`)
            }else {
                bcrypt.hash(pass, null, null, (err, passEncrypted) =>{
                    userModel.password = passEncrypted

                    userModel.save((err, userSaved) =>{
                        if(err) return console.log('Error saving user')
                        if(userSaved){
                            console.log(userSaved)
                        }else {
                            return console.log('Register failed')
                        }
                    })
                })
            }
        })
    }
}

function login(req,res){
    var params = req.body

    User.findOne( { username: params.username }, (err, userFound) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        
        if(userFound){
            bcrypt.compare(params.password, userFound.password, (err, passCorrect) =>{
                if(passCorrect){
                    if(params.getToken === 'true'){
                        return res.status(200).send({ token: jwt.createToken(userFound) })
                    }else {
                        userFound.password = undefined
                        return res.status(200).send({ userFound })
                    }
                }else {
                    return res.status(404).send({ mensaje: 'The user couldnt be identified' })
                }
            })
        }else {
            return res.status(404).send({ mensaje: 'The user couldnt be logged in' })
        }
    } )
}

function registerAdminHotel(req,res){
    var userModel = new User()
    var params = req.body

    if(req.user.rol != 'ROL_ADMIN') return res.status(500).send({ message: 'You dont have the permissions' })

    delete params.rol

    if(params.name && params.lastname && params.username && params.email && params.password){
        userModel.name = params.name
        userModel.lastname = params.lastname
        userModel.email = params.email
        userModel.username = params.username
        userModel.password = params.password
        userModel.rol = 'ROL_ADMIN_HOTEL'
        userModel.image = params.img

        User.find({ $or: [
            { username: userModel.username },
            { email: userModel.email }
        ] }).exec((err, userFound) => {
            if(err) return res.status(500).send({ message: 'Error in the request' })

            if(userFound && userFound.length >= 1 ){
                return res.status(500).send({ message: 'The user already exists' })
            }else {
                bcrypt.hash(params.password, null, null, (err, passEncrypted) =>{
                    userModel.password = passEncrypted
                    userModel.save((err, userSaved) =>{
                        if(err) return res.status(500).send({ message: 'Error saving user' })

                        if(userSaved){
                            res.status(200).send(userSaved)
                        }else {
                            res.status(404).send({ message: 'User couldn´t be registered' })
                        }
                    })
                })
            }
        })
    }else {
        return res.status(500).send({ message: 'Missing data to enter' })
    }
}

function registerUser(req,res){
    var userModel = new User()
    var params = req.body

    delete params.rol

    if(params.name && params.lastname && params.username && params.email && params.password){
        userModel.name = params.name
        userModel.lastname = params.lastname
        userModel.username = params.username
        userModel.email = params.email
        userModel.password = params.password
        userModel.rol = 'ROL_USER'
        userModel.image = params.img

        User.find( { $or:[
            { username: userModel.username },
            { email: userModel.email }
        ] } ).exec((err, userFound ) => {
            if(err) res.status(500).send({ message: 'Error in the request' })

            if(userFound && userFound.length >= 1){
                return res.status(500).send({ message: 'The user already exists' })
            }else {
                bcrypt.hash(params.password, null, null, (err, passEncrypted) => {
                    userModel.password = passEncrypted
                    userModel.save((err, userSaved) => {
                        if(err) return res.status(500).send({ message: 'Error saving user' })

                        if(userSaved){
                            res.status(200).send(userSaved)
                        }else {
                            res.status(404).send({ message: 'User couldn´t be registered' })
                        }
                    })
                })
            }
        })

    }else {
        return res.status(500).send({ message: 'Missing data to enter' })
    }

}

function editUser(req,res){
    var idUser = req.user.sub
    var params = req.body

    if(req.user.rol != 'ROL_USER') return res.status(500).send({ message: 'Cant edit your account' })

    delete params.password
    delete params.rol

    User.find({ $or: [
        { user: params.user },
        { email: params.email }
    ] }).exec(( err, userFound ) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(userFound && userFound.length >= 1){
            return res.status(500).send({ message: 'The user already exists' })

        }else {
            User.findByIdAndUpdate(idUser, params, {new: true, useFindAndModify: false}, (err, editedUser) => {
                if(err) return res.status(500).send({ message: 'Error in the request' })
                if(!editedUser) return res.status(500).send({ message: 'The user couldnt not be found' })
        
                return res.status(200).send({ editedUser })
            })
        }
    } )
}

function deleteUser(req,res){
    var idUser = req.user.sub

    if(req.user.rol != 'ROL_USER') return res.status(500).send({ message: 'Cant delete your account' })

    User.findByIdAndDelete(idUser, (err, userDeleted) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!userDeleted) return res.status(500).send({ message: 'Failed to delete user' })

        return res.status(200).send({ userDeleted })
    })

}

function registeredUsers(req,res){
    if(req.user.rol != 'ROL_ADMIN') return res.status(500).send({ message: 'You dont have the permissions' })

    User.find({rol: 'ROL_USER'},(err, usersFounds) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!usersFounds) return res.status(500).send({ message: 'No users found' })
        return res.status(200).send({ usersFounds })
    })
}

function getUsersRol(req,res){
    var params = req.body
    var rolS = params.rol
    if(req.user.rol != 'ROL_ADMIN') return res.status(500).send({ message: 'You dont have the permissions' })

    User.find({rol: rolS},(err, usersFounds) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!usersFounds) return res.status(500).send({ message: 'No users found' })
        return res.status(200).send({ usersFounds })
    })
}

function getUsersAdminHotel(req,res){
    if(req.user.rol != 'ROL_ADMIN') return res.status(500).send({ message: 'You dont have the permissions' })

    User.find({rol: 'ROL_ADMIN_HOTEL'},(err, adminsFounds) => {
        if(err) return res.status(500).send({ message: 'Error in the request' })
        if(!adminsFounds) return res.status(500).send({ message: 'No users found' })
        return res.status(200).send({ adminsFounds })
    })
}

module.exports = {
    createAdmin,
    login,
    registerAdminHotel,
    registerUser,
    editUser,
    deleteUser,
    registeredUsers,
    getUsersAdminHotel,
    getUsersRol
}