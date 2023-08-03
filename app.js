import express from 'express'
import cors from 'cors'
import ProyectoApiRoutes from './api/routers/proyecto.api.routes.js'
import UserApiRoutes from './api/routers/users.api.routes.js'
import EmpresaApiRoutes from './api/routers/empresa.api.routes.js'
import multer from 'multer'

const app = express()

const PORT = process.env.PORT || 5000;

app.use(cors())
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', express.static('public'))

app.use(UserApiRoutes)
app.use(EmpresaApiRoutes)
app.use(ProyectoApiRoutes)

app.listen(2022, function () {
    console.log('El servidor esta ON! http://localhost:2022')
})