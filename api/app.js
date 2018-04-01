const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
//you can change database by yourself by typing your db name in below after mongodb://localhost/your_database_name
mongoose.connect('mongodb://erwinwahyura:'+process.env.yourpassword+'@ds161042.mlab.com:61042/erwar-todo')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connection success!!!');
});

var index = require('./routes/index')

var app = express()

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);

app.listen(3000)

module.exports = app
