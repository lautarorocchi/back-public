import express from 'express'

import * as PortfolioController from '../controllers/portfolio.controllers.js'

const route = express.Router()

route.get('/', PortfolioController.verPaginaPrincipal)

route.get('/admin/projects', PortfolioController.verTodos)

route.route('/admin/projects/nuevo')
    .get(PortfolioController.formNuevo)
    .post(PortfolioController.crear)

route.get('/admin/projects/:idProyecto', PortfolioController.verUn)

route.route('/admin/projects/:idProyecto/eliminar')
    .get(PortfolioController.formEliminar)
    .post(PortfolioController.eliminar)

route.route('/admin/projects/:idProyecto/editar')
    .get(PortfolioController.formEditar)
    .post(PortfolioController.editar)


route.post('/admin/projects/:idProyecto/publicar', PortfolioController.PublicarProyecto)

export default route