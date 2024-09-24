const { MongoClient, ObjectId } = require("mongodb");
 
let singleton;
 
async function connect() {
    if (singleton) return singleton;
 
    const client = new MongoClient(process.env.MONGO_HOST);
    await client.connect();
 
    singleton = client.db(process.env.MONGO_DATABASE);
    return singleton;
}

const COLLECTION = "customers";
 
async function findAll() {
    const db = await connect();
    return db.collection(COLLECTION).find().toArray();
}
 
async function insert(customer) {
    const db = await connect();
    return db.collection(COLLECTION).insertOne(customer);
}

async function findOne (id) {
    const db = await connect();
    return db.collection(COLLECTION).findOne({ _id: ObjectId.createFromHexString(id) });
}

async function update(id, customer) {
    const db = await connect();
    return db.collection(COLLECTION).updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: customer });
}

async function deleteOne(id) {
    const db = await connect();
    return db.collection(COLLECTION).deleteOne({ _id: ObjectId.createFromHexString(id) });
}

module.exports = { findAll, insert, findOne, update, deleteOne }