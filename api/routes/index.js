var express = require('express')
var router = express.Router()
var c_user = require('../controllers/c_user.js')
var c_todo = require('../controllers/c_todo.js')
var auth = require('../controllers/auth')

router.get('/', function(req, res) {
  res.status(200).send({title: 'Thanks For Using my-template', github: `http://github.com/erwinwahyura`})
})

router.post('/api/signup', auth.signUp)
router.post('/api/signin', auth.signIn)
// router.post('/api/signup', auth.signUp) //done register
// router.post('/api/signin', auth.signIn) //done login

router.get('/api/users', c_user.getAllUser) //done get user
router.get('/api/users/:_id', c_user.getUserById) //done
router.put('/api/users/:_id', c_user.update_user) //done edit user hash password
router.delete('/api/users/:_id', c_user.delete_user) //done

//routing here
router.get('/api/todos', c_todo.getAll)
router.get('/api/todos/:_id', c_todo.getById)
router.post('/api/todos', auth.userAuth, c_todo.create)
router.put('/api/todos/:_id', auth.userAuth, c_todo.updates)
router.delete('/api/todos/:_id', auth.userAuth, c_todo.remove)

module.exports = router
