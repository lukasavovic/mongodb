const express = require('express');
const app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'liceulice';
let db;

MongoClient.connect(url, function(err, client) {
    if(err){
        console.log('Connection failed');
    };
    console.log("Connected successfully to server");
    db = client.db(dbName);
});


app.get("/", (req,res) => {
    res.send('Hello World');
});

app.get("/insert", (req,res) => {
    insertDocuments(
        [
            {"username":"luka", "pw":"super"},
            {"username":"akica", "pw":"superiska"},
            {"username":"lena", "pw":"blejica"},
            {"username":"marko", "pw":"blejica"},
        ],
        function(err, result){
            if(err) throw err;
            res.send(result)
    })
});

app.get("/users", (req,res) => {
    getAllUsers({}, function(err, result){
        if(err) throw err;
        res.send(result);
    })
})

function insertDocuments(arg, callback) {
    const UsersCollection = db.collection('Users');
    UsersCollection.insertMany(arg, callback);
}

function getAllUsers(arg, callback){
    const UsersCollection = db.collection('Users');
    UsersCollection.find(arg).toArray(callback);
}

app.listen('3000', console.log('listening on port 3000'));