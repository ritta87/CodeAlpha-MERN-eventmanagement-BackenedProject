const express=require('express')
const router = express.Router()
const userAuth = require('../middleware/userAuth')
const {registerEvent,
    getAllRegistration , cancelEvent} = require('../controllers/registrationController')

router.post('/event',userAuth,registerEvent)
router.get('/myevent',userAuth,getAllRegistration)
router.delete('/cancel/:eventId',userAuth,cancelEvent)

module.exports = router