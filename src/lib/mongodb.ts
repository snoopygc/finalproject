import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || "mongodb+srv://gccxeye:Vg9SO21lPqUpA87c@finalproject.vcohx.mongodb.net/"
const options = {
    connectTimeoutMS: 5000, // 5 seconds
    socketTimeoutMS: 30000, // 30 seconds
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
            .catch(err => {
                console.error('Failed to connect to MongoDB', err)
                throw err
            })
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
        .catch(err => {
            console.error('Failed to connect to MongoDB', err)
            throw err
        })
}

export default clientPromise

