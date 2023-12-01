import jwt from 'jsonwebtoken'
import * as usuarioService from '../../services/usuarios.services.js'
import * as tokenService from '../../services/token.services.js'
import * as mailService from '../../services/mail.services.js'

import { ObjectId } from 'mongodb'

function login(req, res) {
    const usuario = {
        email: req.body.email,
        password: req.body.password
    }

    usuarioService.login(usuario)
        .then(user => {
            const token = jwt.sign({ id: user._id, role: 'admin' }, 'TOMMY_777')

            tokenService.create({ token, user_id: user._id })

            res.json({ token, user })

        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
}

function buscarUsuarios(req, res) {
    usuarioService.traerUsuarios()
        .then(function (usuarios) {
            res.status(200).json(usuarios)
        })
}

function crearUsuario(req, res) {
    const usuario = {
        name: req.body.name,
        surname: req.body.surname,
        empresa: ObjectId(req.body.empresa),
        email: req.body.email,
        verified: false,
        password: req.body.password
    }
    usuarioService.guardarUsuario(usuario)
        .then(function (nuevoUsuario) {
            res.status(201).json(nuevoUsuario)
        })
        .catch(function (err) {
            res.status(500).json({ message: err.message })
        })
}

function eliminarUsuario(req, res) {
    const id = req.params.id

    usuarioService.eliminar(id)
        .then(() => res.json({ message: 'Usuario eliminado' }))
        .catch(err => res.status(400).json({ message: err.message }))

}

function logout(req, res) {
    const token = req.headers['auth-token']
    tokenService.removeByToken(token)
        .then(function (respuesta) {
            res.status(200).json(respuesta)
        })
}

function buscarMiUsuario(req, res) {
    const id = req.params.id
    /*console.log(id)*/
    usuarioService.buscarPorId(id)
        .then(function (usuario) {
            if (usuario) {
                res.status(200).json(usuario)
            }
            else {
                res.status(404).json({ message: 'Usuario no encontrado' })
            }
        })
}

function editarUsuario(req, res) {
    const id = req.params.id

    const usuario = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
    }

    usuarioService.editar(id, usuario)
        .then(function () {
            res.status(200).json({ message: 'Usuario editado' })
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function verify(req, res){
    const id = req.params.id
    const usuario = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
    }
    const correo = 'lautarocchi@gmail.com'
    const token = '6413e89042be2a41fe490ff4'
    mailService.enviarCorreoVerificacion(correo, token)
}

function acceptVerify(req, res){

}

export {
    login,
    buscarMiUsuario,
    buscarUsuarios,
    crearUsuario,
    eliminarUsuario,
    logout,
    editarUsuario,
    verify,
    acceptVerify
}