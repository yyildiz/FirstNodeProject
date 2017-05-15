const express = require("express");
const bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
const app = express();

app.set("view engine", "pug");
app.set("port", (process.env.PORT || 3000));
app.use(express.static('public'))
app.use(bodyParser.json())

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

app.put('/quotes', (req, res) => {
    db.collection('quotes')
        .findOneAndUpdate({name: 'Yoda'}, {
            $set: {
                name: req.body.name,
                quote: req.body.quote
            }
        }, {
        sort: {_id: -1},
        upsert: true
        }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
    })
})


MongoClient.connect('mongodb://localhost/testDB', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(app.get("port"), () => {
    console.log('listening on ' + app.get("port"))
  })
})
