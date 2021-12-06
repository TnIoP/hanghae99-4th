const express = require('express')
const Posts = require('../schemas/posts')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')

const router = express.Router()




module.exports = router