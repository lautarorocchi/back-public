import { MongoClient, ObjectId } from 'mongodb'
const client = new MongoClient('mongodb+srv://aplicacion:mBxnzlt0RjdDml2h@cluster0.dhykrmv.mongodb.net/?retryWrites=true&w=majority')

async function traerProductos(){
    return client.connect()
    .then(async function () {
        const db = client.db('STACK_UX')
        return db.collection("Productos").find().toArray()
    })
    .catch(function (err) {
        return []
    })
}

async function traerProductosPorEmpresaArchivados(id){
    return client.connect()
    .then(async function () {
        const db = client.db('STACK_UX')
        return db.collection("Productos").find({empresa_id: new ObjectId(id), estado: false}).toArray()
    })
    .catch(function (err) {
        return []
    })
}

async function traerProductoPorId(id) {
    return client.connect()
        .then(function () {
            const db = client.db('STACK_UX')
            return db.collection("Productos").findOne({ _id: new ObjectId(id) })
        })
}

async function traerProductosPorEmpresa(id){
    return client.connect()
    .then(async function () {
        const db = client.db('STACK_UX')
        return db.collection("Productos").find({empresa_id: new ObjectId(id)}).toArray()
    })
    .catch(function (err) {
        return []
    })
}



async function eliminarProducto(id) {
    return client.connect()
        .then(async function () {
            const db = client.db('STACK_UX')
            return db.collection("Productos").deleteOne({ _id: new ObjectId(id) })
        })
}

async function guardar(producto) {

    const ProductoNuevo = {
        ...producto,
    }

    return client.connect()
        .then(async function () {
            const db = client.db('STACK_UX')
            return db.collection("Productos").insertOne(ProductoNuevo)
        })
        .then(function (result) {
            return ProductoNuevo
        })
}

async function editar(id, producto) {
    return client.connect()
        .then(async function () {
            const db = client.db('STACK_UX')
            return db.collection('Productos').updateOne({ _id: new ObjectId(id) }, { $set: producto })
        })
}


async function traerProductosDisponibles() {
    return client.connect()
        .then(async function () {
            const db = client.db('STACK_UX')
            return db.collection("Productos").find({stock: true}).toArray()
        })
        .catch(function (err) {
            return []
        })
}

async function traerProductosNoDisponibles() {
    return client.connect()
        .then(async function () {
            const db = client.db('STACK_UX')
            return db.collection("Productos").find({stock: false}).toArray()
        })
        .catch(function (err) {
            return []
        })
}


export {
    traerProductos,
    traerProductosPorEmpresaArchivados,
    traerProductoPorId,
    traerProductosPorEmpresa,
    eliminarProducto,
    guardar,
    editar,
    traerProductosDisponibles,
    traerProductosNoDisponibles
}

