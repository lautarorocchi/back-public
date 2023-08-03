import * as PortfolioService from '../services/portfolio.services.js'

function verPaginaPrincipal(req, res) {
    PortfolioService.traerProyectos()
        .then(function (proyectos) {
            res.render('Proyecto/Index', { proyectos })
        })
}

function verTodos(req, res) {
    PortfolioService.traerProyectos()
        .then(function (proyectos) {
            res.render('Proyecto/Lista', { proyectos })
        })
}

function formNuevo(req, res) {
    res.render('Proyecto/Nuevo')
}

function crear(req, res) {
    console.log(req.body.publicar)
    const miValor = req.body.publicar
    const post = PortfolioService.publicador(miValor)

    const proyecto = {
        name: req.body.sistema,
        description: req.body.description,
        link: req.body.link,
        img: req.body.imagen,
        public: post
    }

    console.log(proyecto)

    PortfolioService.guardar(proyecto)
        .then(function (proyecto) {
            res.render('Proyecto/Ver', { proyecto })
        })
        .catch(function (err) {
            res.render('500', { message: 'Error al guardar el Alumno' })
        })
}


function verUn(req, res) {
    const id = req.params.idProyecto
    PortfolioService.traerProyectoByID(id)
        .then(function (proyecto) {
            if (proyecto) {
                res.render('Proyecto/Ver', { proyecto })
            }
            else {
                res.render('404')
            }
        })
}

function formEliminar(req, res) {
    const id = req.params.idProyecto
    PortfolioService.traerProyectoByID(id)
        .then(function (proyecto) {
            if (proyecto) {
                res.render('Proyecto/Eliminar', { proyecto })
            }
            else {
                res.render('404')
            }
        })
}

function eliminar(req, res) {
    const proyecto = req.params.idProyecto
    PortfolioService.eliminar(proyecto)
        .then(function (proyecto) {
            res.redirect('/admin/projects')
        })
        .catch(function (err) {
            res.render('500', { message: 'Error al eliminar el proyecto' })
        })
}


function formEditar(req, res) {
    const id = req.params.idProyecto
    PortfolioService.traerProyectoByID(id)
        .then(function (proyecto) {
            if (proyecto) {
                res.render('Proyecto/Editar', { proyecto })
            }
            else {
                res.render('404')
            }
        })
}

function editar(req, res) {
    const id = req.params.idProyecto
    const miValor = req.body.publicar
    const postEditar = PortfolioService.publicador(miValor)

    const proyecto = {
        name: req.body.sistema,
        description: req.body.description,
        link: req.body.link,
        img: req.body.imagen,
        public: postEditar
    }
    PortfolioService.editar(id, proyecto)
        .then(function (proyecto) {
            res.redirect('/admin/projects/' + id)
        })
        .catch(function (err) {
            res.render('500', { message: 'Error al guardar el Proyecto' })
        })
}

function formPublicar(req, res) {
    const id = req.params.idProyecto
    PortfolioService.traerProyectoByID(id)
        .then(function (proyecto) {
            if (proyecto) {
                res.render('Proyecto/Publicar', { proyecto })
            }
            else {
                res.render('404')
            }
        })
}

function PublicarProyecto(req, res) {
    const id = req.params.idProyecto
    const miValor = req.body.publicar

    console.log(miValor)

    const postEditar = PortfolioService.publicador(miValor)

    const proyecto = {
        public: postEditar
    }

    PortfolioService.editar(id, proyecto)
        .then(function (proyectos) {
            res.redirect('/')
        })
        .catch(function (err) {
            res.render('500', { message: 'Error al publicar el Proyecto' })
        })
}


export {
    verPaginaPrincipal,
    verTodos,
    formNuevo,
    crear,
    verUn,
    formEliminar,
    eliminar,
    formEditar,
    editar,
    formPublicar,
    PublicarProyecto
}
