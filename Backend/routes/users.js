var { v4: uuidv4 } = require("uuid");
var _ = require("lodash");
var express = require("express");
var router = express.Router();
var mongoClient = require("mongodb").MongoClient;

let mongoConnectionString = "mongodb://127.0.0.1:27017";
let db;
let usersCollection;

mongoClient
    .connect(mongoConnectionString)
    .then((client) => {
        db = client.db("project");
        usersCollection = db.collection("users");
    })
    .catch((error) => {
        console.log(error);
    });

router.get("/", function(req, res, next) {
    usersCollection.find().toArray((error, users) => {
        if (users) res.send({ successful: true, body: users });
        else res.send({ successful: false, body: error });
    })
});

router.put("/", function(req, res, next) {
    let user = req.body.user;

    usersCollection.updateOne({ _id: user.email }, { $set: user }, (error, result) => {
        if (error) res.send({ successful: false, body: error });
        else res.send({ successful: true });
    });
});

router.delete("/:email", function(req, res, next) {
    let email = req.params.email;
    usersCollection.remove({ _id: email }, (error, result) => {
        if (result) res.send({ successful: true });
        else res.send({ successful: false });
    })
});

router.post("/login", function(req, res, next) {
    let credentials = req.body.credentials;
    let email = credentials.email;
    let password = credentials.password;

    usersCollection.findOne({ _id: email }, (error, user) => {
        if (user) {
            let successful = user.password === password;
            delete user.password;

            res.send({ successful: successful, user: user });
        } else res.send({ successful: false });
    });
});


module.exports = router;
