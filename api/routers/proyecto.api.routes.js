import express from 'express'
import * as proyectoApiControllers from "../controllers/proyecto.api.controllers.js"
import { isLogin } from '../../middleware/auth.middleware.js'
import multer from 'multer'

const uploadedFile = multer({ storage: storage })
  
const router = express.Router()

router.route('*')
    .all([isLogin])

router.route('/api/products/:id')
    .get(proyectoApiControllers.buscarProductosPorEmpresa)    

router.route('/api/productos')
    .get(proyectoApiControllers.buscarProductos)
    .post(/*[uploadedFile.any(), resizeImagenProductos],*/ proyectoApiControllers.crearUnProducto)

router.route('/api/productos/:id')
    .get(proyectoApiControllers.traerUno)
    .put(/*[uploadedFile.any(), resizeImagenProductos],*/ proyectoApiControllers.reemplazarPorId)
    .delete(proyectoApiControllers.eliminarProducto)


/*router.route('/api/productos/stock/disponibles')
    .get(proyectoApiControllers.buscarDisponibles)

    
router.route('/api/productos/stock/agotado')
    .get(proyectoApiControllers.buscarNoDisponibles)*/

export default router