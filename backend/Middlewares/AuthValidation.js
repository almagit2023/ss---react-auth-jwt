const Joi = require('joi');

const signupValidation = (req, res, next) => {

  const signUpschema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required()
  })

  const { error } = signUpschema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: "Bad Request", error })
  }
  next()
}


const loginValidation = (req, res, next) => {

  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required()
  })

  const { error } = loginSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: "Bad Request", error })
  }
  next()
}

module.exports = { signupValidation, loginValidation }