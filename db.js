// Steps to make the Connection between the NodeJS server and Databse server.

// Step-1 : Require the 'mongoose' package.
const mongoose = require('mongoose')

// Step-2 : Define the MongoDB connection URL
// const mongoURL = 'mongodb://127.0.0.1:27017/hotelsDB' // Replace 'myDatabse' with your database name. (Local Database)
const mongoURL = 'mongodb+srv://mohitsoni:Jaipur111@cluster0.8tuwu.mongodb.net/' // (Remote Database)

//Step-3 : Setup the MongoDB Connnection
mongoose.connect(mongoURL)

// Step-4 : Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Step-5 : Define Event listeners for databse connection.

db.on('connected', () => {
    console.log('Connected to Mongo server');
});

db.on('error', (err) => {
    console.log('MongoDb connection error:',err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Step-6 : Export the database connection
module.exports = db;