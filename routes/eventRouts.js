const express = require('express')
const adminAuth = require('../middleware/adminAuth')
const userAuth = require('../middleware/userAuth')

const router = express.Router()

const {createEvent,getAllEvents,
    getEventById,updateEvent,
    deleteEvent} = require('../controllers/eventController')
const { userViewEvents } = require('../controllers/registrationController')
router.post('/create',userAuth,adminAuth,createEvent)
router.get('/viewEvents',getAllEvents)
router.get('/:id',getEventById)
router.put('/:id',userAuth,adminAuth,updateEvent)
router.delete('/:id',userAuth,adminAuth,deleteEvent)

module.exports = router;