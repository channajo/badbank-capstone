var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

const router = express.Router();

// used to serve static files from the public directory
app.use(express.static('public'));
app.use(cors());

// create user account (echo it to calling client)
app.get('/account/create/:name/:email/:password', function (req, res) {
    // else create user
    dal.create(req.params.name, req.params.email, req.params.password)
        .then((user) =>{
        console.log(user);
        res.send(user);
    });
});

// gets user data
app.get('/account/userdata/:email/:password', function (req, res) {
    dal.userdata().
        then((docs) => {
        console.log(docs);
        res.send(docs);
    })
})

// all accounts
app.get('/account/all', function (req, res) {
    dal.all().
        then((docs) => {
        //console.log(docs);
        res.send(docs);
    });
});

// // user verification / login
// app.get('/account/login/:email/:password', function (req, res){
//     dal.login(req.params.email, req.params.password)
//     .then((user) => {
//     //console.log(user);
//     res.send(user);
//     });
// });

//deposit
app.get('/account/:email/deposit/:amount', function (req, res){
    dal.deposit(req.params.email, req.params.amount)
    .then((user) => {
    console.log(user);
    res.send(user);
    });
});

//withdraw
app.get('/account/withdraw/:email/:amount', function (req, res){
    dal.withdraw(req.params.email, req.params.amount)
    .then((user) => {
    console.log(user);
    res.send(user);
    });
});


var port = 8080;
app.listen(port);
console.log(`Running on port: ${port}`);