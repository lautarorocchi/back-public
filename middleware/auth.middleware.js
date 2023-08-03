import jwt from 'jsonwebtoken'
import * as userService from '../services/usuarios.services.js'
import * as tokenService from '../services/token.services.js'

function isLogin(req, res, next) {

    const token = req.headers['auth-token']

    if (!token) {
        return res.status(401).json({ message: 'No enviaste el token para realizar acciones' })
    }

    try {
        const payload = jwt.verify(token, 'TOMMY_777')
        tokenService.findByToken(token)
            .then(token => {
                if (token) {
                    userService.buscarPorId(payload.id)
                        .then(user => {
                            req.user = user
                            next()
                        })
                }
                else {
                    res.status(401).json({ message: 'Token inválido' })
                }
            })

    }
    catch (err) {
        return res.status(401).json({ message: 'Token inválido' })
    }

}

function isAdmin(req, res, next) {
    if (req.user.email === 'lautarorocchi@gmail.com') {
        next()
    }
    else {
        res.status(401).json({ message: 'No tenes permisos para realizar esta acción' })
    }
}


export {
    isLogin,
    isAdmin,
}