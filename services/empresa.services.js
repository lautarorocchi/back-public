import { MongoClient, ObjectId } from 'mongodb'
const client = new MongoClient('mongodb+srv://aplicacion:mBxnzlt0RjdDml2h@cluster0.dhykrmv.mongodb.net/?retryWrites=true&w=majority')
const db = client.db('STACK_UX')
const empresa = db.collection('Empresa')
const empresaDatabase = db.collection('Empresa')
const tiposEmpresa = db.collection('TiposDeEmpresa')

async function traerEmpresa(){
    return client.connect()
    .then(async function () {
        return empresa.find().toArray()
    })
    .catch(function (err) {
        return []
    })
}

async function traerTiposDeEmpresa(){
    return client.connect()
    .then(async function () {
        return tiposEmpresa.find().toArray()
    })
    .catch(function (err) {
        return []
    })
}

async function buscarRubros(id){
    return client.connect()
    .then(async function () {
        return empresa.find({rubro: new ObjectId(id)}).toArray()
    })
    .catch(function (err) {
        return []
    })
}

async function buscarSubrubros(id){
    return client.connect()
    .then(async function () {
        return empresa.find({subrubro: new ObjectId(id)}).toArray()
    })
    .catch(function (err) {
        return []
    })
}

async function traerEmpresaPorId(id) {
    return client.connect()
        .then(function () {
            return empresa.findOne({ _id: new ObjectId(id) })
        })
}

async function guardar(empresa) {

    const empresaNueva = {
        ...empresa,
    }

    return client.connect()
        .then(async function () {
            return empresaDatabase.insertOne(empresaNueva)
        })
        .then(function (result) {
            return empresaNueva
        })
}

async function traerRubroPorId(id) {
    return client.connect()
        .then(function () {
            return tiposEmpresa.aggregate([
                { $match: { 'rubro.id': new ObjectId(id) } },
                {
                  $project: {
                    rubro: {
                      $filter: {
                        input: '$rubro',
                        as: 'rubro',
                        cond: { $eq: ['$$rubro.id', new ObjectId(id)] },
                      },
                    },
                    _id: 0,
                  },
                },
              ]).toArray();
        })
}

async function traerSubrubroPorId(id) {
    return client.connect()
    .then(function () {
        return tiposEmpresa.aggregate([
            { $match: { 'subrubros.id': new ObjectId(id) } },
            {
              $project: {
                subrubros: {
                  $filter: {
                    input: '$subrubros',
                    as: 'subrubros',
                    cond: { $eq: ['$$subrubros.id', new ObjectId(id)] },
                  },
                },
                _id: 0,
              },
            },
          ]).toArray();
    })
}

async function editar(id, empresita) {
    return client.connect()
    .then(async function () {
        const db = client.db('STACK_UX')
        return db.collection('Empresa').updateOne({ _id: new ObjectId(id) }, { $set: empresita })
    })
}

export{
    traerEmpresa,
    traerTiposDeEmpresa,
    traerEmpresaPorId,
    guardar,
    buscarRubros,
    buscarSubrubros,
    traerRubroPorId,
    traerSubrubroPorId,
    editar
}