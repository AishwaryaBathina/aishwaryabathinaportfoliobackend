var express = require('express');
var MongoClient = require("mongodb").MongoClient;
const serverless = require('serverless-http')
const cors = require("cors");
const router = express.Router();

const app = express(); // Change 'Express' to 'express' for consistency

app.use(cors());
app.use(express.json()); // Change 'Express' to 'express' for consistency


// app.use('/', router)

var CONNECTION_STRING = "mongodb+srv://admin:Mongodb%407474@cluster0.iectwte.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASE_NAME = "AishwaryaBathina";
var database;
var port = 8080

app.listen(port, () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        console.log("Aishwarya")
        if (error) {
            console.error("MongoDB Connection error:", error);
            return;
        }

        database = client.db(DATABASE_NAME);
        console.log("MongoDB Connection successful");
        console.log("Port running at 8080")
    });
});

router.get('/education', (req, res) => {
    database.collection("education").find({}).toArray((error, result) => {
        res.send(result)
    })
});

router.get('/workExperience', (req, res) => {
    database.collection("workExperience").find({}).toArray((error, result) => {
        res.send(result)
    })
});

router.get('/skills', (req, res) => {
    database.collection("skills").find({}).toArray((error, result) => {
        res.send(result)
    })
});

router.get('/projects', (req, res) => {
    database.collection("projects").find({}).toArray((error, result) => {
        res.send(result)
    })
});


module.exports = app;
app.use('/', router); // Assuming '/.netlify/functions/api' is your base path
module.exports.handler = serverless(app);
