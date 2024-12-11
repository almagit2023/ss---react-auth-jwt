const Router = require('express').Router();
const { signup, login } = require('../Controllers/AuthController')
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation')

Router.post('/login', loginValidation, login)
Router.post('/signup', signupValidation, signup)

module.exports = Router;