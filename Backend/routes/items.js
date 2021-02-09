var { v4: uuidv4 } = require("uuid");
var express = require("express");
var router = express.Router();
var multiparty = require("multiparty");
var axios = require("axios");
var multer = require("multer");
var mongoClient = require("mongodb").MongoClient;

let mongoConnectionString = "mongodb://127.0.0.1:27017";
let db;
let itemsCollection;
let categoryCollection;

let storage = multer.diskStorage({
    destination: function(req, file, cb) { cb(null, "public"); },
    filename: function(req, file, cb) { cb(null, file.originalname); }
});
let upload = multer({ storage: storage }).single("file");

mongoClient
    .connect(mongoConnectionString)
    .then((client) => {
        db = client.db("project");
        itemsCollection = db.collection("items");
        categoryCollection = db.collection("categories");
    })
    .catch((error) => {
        console.log(error);
    });

router.get("/", function(req, res, next) {
    itemsCollection.find().toArray((err, items) => {
        res.send({ body: items });
    });
});

router.post("/", function(req, res, next) {
    let id = uuidv4();
    let item = { _id: id, reviews: [], discount: 0.0, ratings: {}, averageRating: 0 };

    Object.keys(req.body.item).forEach((key) => {
        item[key] = req.body.item[key];
    });

    itemsCollection
        .insertOne(item)
        .then(result => res.send({ successful: true }))
        .catch(error => res.send({ successful: false, body: error.errmsg }));
});

router.post("/images/", function(req, res, next) {
    upload(req, res, function(error) {
        if (error) { res.status(500).json(error); } else { res.status(200).send(req.file); }
    })
});

router.put("/", function(req, res, next) {
    let item = req.body.item;
    let id = item._id;

    itemsCollection.updateOne({ _id: id }, { $set: item }, (error, result) => {
        if (error) res.send({ successful: false, body: error });
        else res.send({ successful: true });
    });
});

router.delete("/:id", function(req, res, next) {
    let id = req.params.id;
    itemsCollection.remove({ _id: id }, (error, result) => {
        if (result) res.send({ successful: true });
        else res.send({ successful: false });
    })
});

module.exports = router;
