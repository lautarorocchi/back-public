import express from 'express'
import * as proyectoApiControllers from "../controllers/proyecto.api.controllers.js"
import { isLogin } from '../../middleware/auth.middleware.js'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img/uploads/productos')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const uploadedFile = multer({ storage: storage })
  
const router = express.Router()

router.route('*')
    .all([isLogin])

router.route('/api/products/:id')
    .get(proyectoApiControllers.buscarProductosPorEmpresa)    

router.route('/api/productos')
    .get(proyectoApiControllers.buscarProductos)
    .post(proyectoApiControllers.crearUnProducto)

router.route('/api/productos/archivados/:id')
    .get(proyectoApiControllers.buscarProductosPorEmpresaArchivados)

router.route('/api/productos/:id')
    .get(proyectoApiControllers.traerUno)
    .put(proyectoApiControllers.reemplazarPorId)
    .delete(proyectoApiControllers.eliminarProducto)

router.route('/api/productos/activar/:id')
    .put(proyectoApiControllers.activarProducto)

router.route('/api/productos/desactivar/:id')
    .put(proyectoApiControllers.desactivarProducto)

export default router