// model always use uppercase first
const UserModel = require('../models/m_user.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  register: (req, res) => {
    const hashPassword = bcrypt.hashSync(req.body.password, salt)
    const password = hashPassword
    const last_online = new Date()
    const {first_name, last_name, username, email, id_fb, role, score, title } = req.body
    const dataRegister = new UserModel({
      first_name,
      last_name,
      username,
      password,
      email,
      id_fb,
      role,
      score,
      title,
      last_online
    })
    dataRegister.save((err, response) => {
      if (err) res.status(500).send({
        ok: false,
        message: 'register user failed!',
        data: null
      })
      else res.status(201).send({
        ok: true,
        message: 'Successful register user!',
        data: dataRegister
      })
    })
  },
  login: (req, res) => {
    const { username, email, password } = req.body
    console.log(username, email);
    UserModel.find({
      $or: [{email}, {username}]
    }, (err, user) => {
      console.log(err, user)
      if (err)
        res.status(500).send({
          ok: false,
          message: err
        })
      const { id, role } = user
      const authorization = jwt.sign({id, role}, process.env.SECRET)
      const objAuth = {
        access_token: authorization,
        expiratesIn: 1001,
        grant_type: "Bearer"
      }
      res.status(201).send({
        ok: true,
        authResponse: objAuth
      })
    })
  },
  users: (req, res) => {
    UserModel.find({})
      .then((response) => {
        const obj = []

        response.forEach(user => {
          const data = {
            _id: user._id,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            role: user.role,
            score: user.score,
            title: user.title,
            last_online: user.last_online,
            __v: user.__v
          }
          obj.push(data)
        })
        res.status(200).send({
          ok: true,
          message: 'Successful get users!',
          data: obj
        })
      })
      .catch((err) => {
        res.status(500).send({
          ok: false,
          message: 'Error!',
          detail: err
        })
      })
  }

};
