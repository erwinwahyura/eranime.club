const m_user = require('../models/m_user');
const m_todo = require('../models/m_todo');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var jwt = require('jsonwebtoken');
require('dotenv').config()

var signIn = function(req, res, next) {
  console.log('masuk 1');
  var username = req.body.username;
  var password = req.body.password;

  m_user.findOne({ username: username }, function(err, user) {
    if(err) res.send(err);
    if(user) {
      bcrypt.compare(password, user.password)
      .then(result => {
        if(result) {
          var token = jwt.sign({id: user._id, username: user.username}, process.env.SECRET);
          res.send({token, id: user._id, name: user.username})
        } else {
          res.send({ msg: 'Incorrect password' });
        }
      })
      .catch(err => console.log(err))
    } else res.send({ msg: 'No such user' })
  })
}

var signUp = function(req, res, next) {
  console.log('masuk 2');
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(req.body.password, salt);

  var newUser = new m_user({
    username: req.body.username,
    email: req.body.email,
    password: hash
  })
  newUser.save((err, user) => {
    if(err) {
      res.send(err.errors)
    } else res.send(user)
  })
}

var userData = function(req, res, next) {
  let token = req.headers.token

  if(token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(!err) {
        res.send(decoded)
      } else {
        res.send(err)
      }
    })
  } else {
    res.send({msg: 'Not logged in'})
  }
}

//userAuth for reply
var userAuth = function(req, res, next) {
  let token = req.headers.token
  console.log(token);
  if(token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
<<<<<<< HEAD
      console.log('ini decode nya --->>',decoded);
      console.log('ini creatornya', req.body.creator);
=======
>>>>>>> 2e4e2dec75a0b961c4c9ac1423d4ca5f0a0da1ed
      if(decoded.id == req.body.creator) {
        next()
      } else {
        console.log('user not match');
        res.send(err)
      }
    })
  } else {
    res.send({msg: 'Not logged in'})
  }
}

module.exports = {
  signIn, signUp, userAuth, userData
};
