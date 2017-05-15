const express = require("express");
const bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
const app = express();

app.set("view engine", "pug");

var db

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.pug', {quotes: result})
  })
});

app.get("/quotes", (req, res) => {
    db.collection("quotes").find().toArray(function(err, res) {
        console.log(res);
    })
});

app.post('/quotes', (req, res) => {
    db.collection("quotes").save(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log("saved to database");
        res.redirect("/");
    })
});



MongoClient.connect('mongodb://localhost/testDB', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})
