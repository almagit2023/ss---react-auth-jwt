const UserModel = require("../Models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email })
    if (user) {
      return res.status(409).json({ message: 'User already exists', success: false })
    }
    const userModel = new UserModel({ name, email, password })
    userModel.password = await bcrypt.hash(password, 10); // 10 is the salt
    await userModel.save();

    res.status(201).json({
      message: "Sign up successful",
      success: true
    })
  }
  catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      success: false
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })
    const errorMessage = 'Auth Failed, Wrong email or password'

    // if user doesn't exist
    if (!user) {
      return res.status(403).json({ message: errorMessage, success: false })
    }

    // if entered password not equal
    const isPasswordEqual = await bcrypt.compare(password, user.password)
    if (!isPasswordEqual) {
      return res.status(403).json({ message: errorMessage, success: false })
    }

    // if correct userName and password then tke jwttoken
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '24h' } // Options
    );

    res.status(201).json({
      message: "login successful",
      success: true,
      jwtToken, email, name: user.name
    })
  }
  catch (error) {
    res.status(500).json({
      message: "Internal Server error",
      success: false
    })
  }
}

module.exports = { signup, login }