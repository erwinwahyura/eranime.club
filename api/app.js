const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()
const normalizePort = require('normalize-port')

// ========= mongodb mlab ===
const uri = 'mongodb://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@ds131329.mlab.com:31329/'+process.env.DB_NAME
mongoose.connect(uri, {useMongoClient: true}, function(err) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ');
  }
});
// ========- end of mlab ===

var index = require('./routes/index')

var app = express()

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index);

const port = normalizePort(process.env.PORT || '3000')
app.listen(port, () => console.log('listening on port ', port))

module.exports = app
