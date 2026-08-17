const express = require('express')
const userAuth =require('../middleware/userAuth')
const router = express.Router()
const {userRegister,
    loginUser,userHome} = require('../controllers/userController')

router.post('/signup',userRegister)
router.post('/login',loginUser)
router.get('/home',userAuth,userHome)


module.exports = router