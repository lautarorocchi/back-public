import { ObjectID } from 'bson'
import * as proyectoService from '../../services/productos.services.js'

function buscarProductos(req,res){
    proyectoService.traerProductos()
    .then(function (productos) {
        res.status(200).json(productos)
    })
}

function traerUno(req, res){
    const id = req.params.id
    /*console.log(id)*/
    proyectoService.traerProductoPorId(id)
        .then(function (producto) {
            if (producto) {
                res.status(200).json(producto)
            }
            else {
                res.status(404).json({ message: 'Proyecto no encontrado' })
            }
    })
}

function crearUnProducto(req, res) {
    const producto = {
        name: req.body.name,
        description: req.body.description,
        cantidad: req.body.cantidad,
        img: req.body.img,
        empresa_id : ObjectID(req.body.empresa_id)
    }
    proyectoService.guardar(producto)
        .then(function (nuevoProducto) {
            res.status(201).json(nuevoProducto)
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function eliminarProducto(req, res) {
    const id = req.params.id
    proyectoService.eliminarProducto(id)
        .then(function () {
            res.status(200).json({ message: 'Producto eliminado' })
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function reemplazarPorId(req, res) {
    const id = req.params.id

    const producto = {
        name: req.body.name,
        description: req.body.description,
        cantidad: req.body.cantidad,
        img: req.body.img,
        empresa_id : ObjectID(req.body.empresa_id)
    }

    proyectoService.editar(id, producto)
        .then(function () {
            res.status(200).json({ message: 'Producto reemplazado' })
        })
        .catch(function (err) {
            res.status(500).json(err)
        })
}

function buscarDisponibles(req, res) {
    proyectoService.traerProductosDisponibles()
        .then(function (productos) {
            res.status(200).json(productos)
        })
}

function buscarNoDisponibles(req, res) {
    proyectoService.traerProductosNoDisponibles()
        .then(function (productos) {
            res.status(200).json(productos)
        })
}

function buscarProductosPorEmpresa(req, res){
    const id = req.params.id
    proyectoService.traerProductosPorEmpresa(id)
        .then(function (producto) {
            if (producto) {
                res.status(200).json(producto)
            }
            else {
                res.status(404).json({ message: 'Productos no encontrados' })
            }
    })
}


export {
    buscarProductos,
    traerUno,
    crearUnProducto,
    eliminarProducto,
    reemplazarPorId,
    buscarDisponibles,
    buscarNoDisponibles,
    buscarProductosPorEmpresa
}