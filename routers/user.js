const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../schemas/users')
const authMiddleware = require('../middlewares/auth-middleware')





module.exports = router