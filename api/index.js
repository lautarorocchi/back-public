import express from 'express'
import cors from 'cors'

import ProyectoApiRoutes from './routers/proyecto.api.routes.js'
import UserApiRoutes from './routers/users.api.routes.js'
import EmpresaApiRoutes from './routers/empresa.api.routes.js'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/',UserApiRoutes)
app.use('/',EmpresaApiRoutes)
app.use('/',ProyectoApiRoutes)

export default app