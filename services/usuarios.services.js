import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'


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


export {
    login,
    traerUsuarios,
    guardarUsuario,
    eliminar,
    buscarPorId,
    editar
}