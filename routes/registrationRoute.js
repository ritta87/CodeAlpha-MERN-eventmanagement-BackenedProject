const express=require('express')
const router = express.Router()
const userAuth = require('../middleware/userAuth')
const adminAuth = require('../middleware/adminAuth')
const {registerEvent,
    getAllRegistration , 
    cancelEvent,
    getAllRegisteredEvents
}
 = require('../controllers/registrationController')

router.post('/event',userAuth,registerEvent)
router.get('/myevent',userAuth,getAllRegistration)
router.delete('/cancel/:eventId',userAuth,cancelEvent)
router.get('/allRegistered',userAuth,adminAuth,getAllRegisteredEvents)
module.exports = router