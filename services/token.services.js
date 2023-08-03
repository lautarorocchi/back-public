import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb+srv://aplicacion:mBxnzlt0RjdDml2h@cluster0.dhykrmv.mongodb.net/?retryWrites=true&w=majority')
const db = client.db('STACK_UX')
const tokens = db.collection('Tokens')

async function create(token) {
    await client.connect()
    await tokens.insertOne(token)
}

async function removeByToken(token) {
    await client.connect()
    await tokens.deleteOne({ token })
}

async function removeByUserId(user_id) {
    await client.connect()
    await tokens.deleteMany({ user_id })
}

async function findByToken(token) {
    await client.connect()
    return await tokens.findOne({ token })
}


export {
    create,
    removeByToken,
    removeByUserId,
    findByToken
}