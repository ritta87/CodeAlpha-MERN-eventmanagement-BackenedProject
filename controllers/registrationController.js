const Registration = require('../models/Registration')
const Event = require('../models/Events')
const User = require('../models/User')
const Events = require('../models/Events')

//1.user register for an event
const registerEvent = async(req,res)=>{
    try{
    const userId = req.user.id
    const {eventId} = req.body
    const event = await Event.findOneAndUpdate(
        {_id:eventId,
        availableSeats:{$gt:0}},
        {$inc:{availableSeats:-1}},{
            new:true
        }
    )
    if(!event){
        return res.status(404).json({
            success:false,
            message:"No such event exists!"
        })
    }
    const alreadyRegister = await Registration.findOne({
        user:userId,
        event:eventId
    })
    if(alreadyRegister){
        return res.status(400).json({
            success:false,
            message:"Already registered for this Event!"
        })
    }
    //check available seats
    if(event.availableSeats<=0){
        return res.status(400).json({
        success: false,
        message: "No seats available"
    })
}
   
    const registration = await Registration.create({
        user:userId,
        event:eventId
    })
   
    await event.save()

    res.status(201).json({
        success:true,
        message:"Registered successfully!!",
        registration
    })

}catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    })
}

}
//2.Get all my registered events.
const getAllRegistration = async(req,res)=>{
    const userId = req.user.id
    const events = await Registration.find({user:userId}).populate('event')
    if(events.length===0){
        return res.status(200).json({
            success:true,
            message:"No registered events available yet!"
        })
    }
    res.status(200).json({
        success:true,
        events
    })

}



//3.cancel my registered event.
const cancelEvent = async(req,res)=>{
    try{
    const userId = req.user.id;
    const {eventId} = req.params
    const registration = await Registration.findOne({user:userId,event:eventId})
    if(!registration){
        return res.status(404).json({
            success:false,
            message:"No such registration exists!"
        })
    }
    await Registration.findOneAndDelete({
        user:userId,
        event:eventId
    })
    const event = await Event.findOneAndUpdate(
        {_id:eventId},
        {$inc:{availableSeats:1}},{
        new:true
        }
    )
    res.status(200).json({
        success:true,
        message:"Event cancelled successfully!"
    })
}catch(error){
    res.status(500).json({
        success:false,
        message:error.message
    })
}

}
module.exports = {registerEvent,getAllRegistration,cancelEvent}