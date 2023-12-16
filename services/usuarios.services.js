import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import * as cryptoServices from '../api/functions/crypto.js'
import * as mailServices from '../services/mail.services.js'

const client = new MongoClient('mongodb+srv://aplicacion:mBxnzlt0RjdDml2h@cluster0.dhykrmv.mongodb.net/?retryWrites=true&w=majority')
const db = client.db('STACK_UX')
const users = db.collection("Usuarios")

async function login({ email, password }) {
    await client.connect()
    const user = await users.findOne({ email })

    if (!user) {
        throw new Error('Email o contraseña incorrectas')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Email o contraseña incorrectas')
    }

    return user
}

async function traerUsuarios() {
    await client.connect()
    return await users.find().toArray()
}


async function guardarUsuario(usuario) {
    const UsuarioNuevo = {
        ...usuario,
    }

    await client.connect()
    const usuarioExistente = await users.findOne({ email: UsuarioNuevo.email })

    if (usuarioExistente) {
        throw new Error('El email ya esta utilizado en uno de los usuarios')
    }

    const salt = await bcrypt.genSalt(10)
    UsuarioNuevo.password = await bcrypt.hash(UsuarioNuevo.password, salt)
    await users.insertOne(UsuarioNuevo)

    return UsuarioNuevo
}

async function eliminar(id) {
    await client.connect()

    const resultado = await users.deleteOne({ _id: ObjectId(id) })

    if (resultado.deletedCount === 0) {
        throw new Error('El usuario no existe')
    }
}

async function buscarPorId(id) {
    await client.connect()
    return await users.findOne({ _id: ObjectId(id) })
}

async function editar(id, usuario) {
    return client.connect()
        .then(async function () {
            return users.updateOne({ _id: new ObjectId(id) }, { $set: usuario })
        })
}

async function verificarEmail(email) {
    try {
        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const verificationCode = cryptoServices.generateUniqueCode();
        await users.updateOne({ email }, {
            $set: {
                verificationCode,
                recoveryCodeUtilizado: false
            }
        });

        await mailServices.enviarRecuperarContra(email, verificationCode);

        return email;
    } catch (error) {
        console.error('Error en verifyEmail:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

async function cambiarContra(verificationCode, newPassword) {
    try {
        const user = await users.findOne({ verificationCode });

        if (!user) {
            throw new Error('Código de verificación no válido');
        }

        /*if (user.recoveryCodeUtilizado) {
            throw new Error('El código de recuperación ya ha sido utilizado, pero continuamos con la actualización.');
        }*/

        const isSameAsCurrentPassword = await bcrypt.compare(newPassword, user.password);

        if (isSameAsCurrentPassword) {
            throw new Error('La nueva contraseña no puede ser igual a la contraseña actual');
        }

        const salt = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(newPassword, salt);

        await users.updateOne(
            { verificationCode },
            {
                $set: {
                    password: newHashedPassword
                },
                $unset: {
                    verificationCode: "",
                    recoveryCodeUtilizado: ""
                }
            }
        );

        return {
            message: 'Contraseña actualizada exitosamente'
        };
    } catch (error) {
        throw error;
    }
}

async function validarCodigoRecuperacion(codigoRecuperacion) {
    try {
        const user = await users.findOne({
            verificationCode: codigoRecuperacion,
            recoveryCodeUtilizado: false
        });

        if (!user) {
            throw new Error('Código de recuperación inválido.');
        }

        const resultado = await users.updateOne(
            { verificationCode: codigoRecuperacion, recoveryCodeUtilizado: false },
            { $set: { recoveryCodeUtilizado: true } }
        );

        if (resultado.modifiedCount > 0) {
            return resultado;
        } else {
            throw new Error('Error al actualizar el código de recuperación.');
        }
    } catch (error) {
        throw new Error('Error al validar el código de recuperación:')
    }
}


export {
    login,
    traerUsuarios,
    guardarUsuario,
    eliminar,
    buscarPorId,
    editar,
    verificarEmail,
    cambiarContra,
    validarCodigoRecuperacion
}