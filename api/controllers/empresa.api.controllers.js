import { ObjectId } from 'mongodb'
import * as empresaService from '../../services/empresa.services.js'

function buscarEmpresa(req, res) {
    empresaService.traerEmpresa()
        .then(function (empresas) {
            res.status(200).json(empresas)
        })
}

function buscarTiposDeEmpresa(req, res) {
    empresaService.traerTiposDeEmpresa()
        .then(function (empresas) {
            res.status(200).json(empresas)
        })
}

function traerUno(req, res) {
    const id = req.params.id
    empresaService.traerEmpresaPorId(id)
        .then(function (empresa) {
            if (empresa) {
                res.status(200).json(empresa)
            }
            else {
                res.status(404).json({ message: 'Empresa no encontrada' })
            }
        })
}

function traerPorId(id){
    empresaService.traerEmpresaPorId(id)
    .then(function (empresa) {
        if (empresa) {
            res.status(200).json(empresa.email)
        }
        else {
            res.status(404).json({ message: 'Empresa no encontrada' })
        }
    })
}

function crearEmpresa(req, res) {
    const empresa = {
        name: req.body.name,
        descripcion: req.body.descripcion,
        email: req.body.email,
        img: req.body.img,
        localidad: req.body.localidad,
        rubro: ObjectId(req.body.rubro),
        subrubro: ObjectId(req.body.subrubro),
    }
    empresaService.guardar(empresa)
        .then(function (nuevaEmpresa) {
            res.status(201).json(nuevaEmpresa)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function buscarRubro(req, res) {
    const id = req.params.id
    empresaService.buscarRubros(id)
        .then(function (empresa) {
            if (empresa) {
                res.status(200).json(empresa)
            }
            else {
                res.status(404).json({ message: 'Rubros no encontrados' })
            }
        })
}

function buscarSubrubro(req, res) {
    const id = req.params.id
    empresaService.buscarSubrubros(id)
        .then(function (empresa) {
            if (empresa) {
                res.status(200).json(empresa)
            }
            else {
                res.status(404).json({ message: 'Rubros no encontrados' })
            }
        })
}

function buscarTiposDeRubro(req, res){
    const id = req.params.id
    empresaService.traerRubroPorId(id)
        .then(function (empresa) {
            if (empresa) {
                res.status(200).json(empresa)
            }
            else {
                res.status(404).json({ message: 'Rubro no encontrado' })
            }
        })
}


function buscarTiposDeSubrubro(req, res){
    const id = req.params.id
    empresaService.traerSubrubroPorId(id)
        .then(function (empresa) {
            if (empresa) {
                res.status(200).json(empresa)
            }
            else {
                res.status(404).json({ message: 'Subrubro no encontrado' })
            }
        })
}


export {
    buscarEmpresa,
    buscarTiposDeEmpresa,
    traerUno,
    traerPorId,
    crearEmpresa,
    buscarRubro,
    buscarSubrubro,
    buscarTiposDeRubro,
    buscarTiposDeSubrubro
}