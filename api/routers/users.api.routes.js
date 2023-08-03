import express from 'express'
import * as userApiControllers from "../controllers/user.api.controllers.js"

const router = express.Router()
   
router.route('/api/usuarios')
    .get(userApiControllers.buscarUsuarios)
    .post(userApiControllers.crearUsuario)

router.route('/api/usuarios/login')
    .post(userApiControllers.login)

router.route('/api/usuarios/logout')
    .delete(userApiControllers.logout)

router.route('/api/usuarios/:id')
    .get(userApiControllers.buscarMiUsuario)
    .put(userApiControllers.editarUsuario)
    .delete(userApiControllers.eliminarUsuario)

export default router