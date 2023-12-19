import express from 'express'
import * as empresaApiControllers from "../controllers/empresa.api.controllers.js"
import { isLogin } from '../../middleware/auth.middleware.js'
import multer from 'multer'
import { isLogin } from '../../middleware/auth.middleware.js'
/*import { resizeImagen } from '../functions/resizeImagen.js'*/

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './public/img/uploads/empresas')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadedFile = multer({ storage: storage })

const router = express.Router();

router.route('/api/empresas')
    .get(empresaApiControllers.buscarEmpresa)
    .post(/*[uploadedFile.any(), resizeImagen],*/ empresaApiControllers.crearEmpresa)

router.route('/api/empresas/tipos')
    .get(empresaApiControllers.buscarTiposDeEmpresa)

router.route('/api/empresas/rubro/:id')
    .get(empresaApiControllers.buscarTiposDeRubro)

router.route('/api/empresas/subrubro/:id')
    .get(empresaApiControllers.buscarTiposDeSubrubro)

router.route('/api/empresas/entidad/:id')
    .get(empresaApiControllers.buscarRubro)

router.route('/api/empresas/categoria/:id')
    .get(empresaApiControllers.buscarSubrubro)

router.route('/api/empresas/:id')
    .get(empresaApiControllers.traerUno)
    .put([isLogin], empresaApiControllers.editarEmpresa)

export default router