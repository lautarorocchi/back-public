import express from 'express'
import * as userApiControllers from "../controllers/user.api.controllers.js"

const router = express.Router()
   
router.route('/api/usuarios')
    .get(userApiControllers.buscarUsuarios)
    .post(userApiControllers.crearUsuario)

router.route('/api/usuario-admin')
    .post(userApiControllers.crearAdmin)

router.route('/api/verify/:id')
    .post(userApiControllers.verify)
    .put(userApiControllers.acceptVerify)

router.route('/api/usuarios/forgot-password')
    .post(userApiControllers.recoverPassword)
    .put(userApiControllers.resetPassword)

router.route('/api/usuarios/validate-code')
    .post(userApiControllers.validarCodigo)

router.route('/api/usuarios/login')
    .post(userApiControllers.login)

router.route('/api/usuarios/logout')
    .delete(userApiControllers.logout)

router.route('/api/usuarios/:id')
    .get(userApiControllers.buscarMiUsuario)
    .put(userApiControllers.editarUsuario)
    .delete(userApiControllers.eliminarUsuario)

export default router