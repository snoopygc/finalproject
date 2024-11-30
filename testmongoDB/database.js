const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://labradorsummershine:labradorsummershine123456789@cluster0.mongodb.net/<final>?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        const db = client.db("final");
        return db;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = connectDB;
