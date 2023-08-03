import sharp from 'sharp'

function resizeImagen(req, res, next) {
    if (req.files.length > 0) {
        sharp(req.files[0].path)
            .resize(150, 150)
            .toFile('./public/img/resize/empresas/' + Date.now() + '.jpg')
            .then(() => {
                next()
            })
            .catch(err => {
                res.status(500).json({message:'No se pudo subir la imagen'})
            })
    }

    else {
        next()
    }

}

function resizeImagenProductos(req, res, next) {
    if (req.files.length > 0) {
        sharp(req.files[0].path)
            .resize(150, 150)
            .toFile('./public/img/resize/productos/' + Date.now() + '.jpg')
            .then(() => {
                next()
            })
            .catch(err => {
                res.status(500).json({message:'No se pudo subir la imagen'})
            })
    }

    else {
        next()
    }

}

export{
    resizeImagen,
    resizeImagenProductos
}