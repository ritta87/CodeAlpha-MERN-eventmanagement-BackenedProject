const Event = require('../models/Events')
//1.create an event
const createEvent = async (req,res)=>{
    try{
        const {eventTitle,description,date,venue,capacity,availableSeats} = req.body
       const event = await Event.create({
            eventTitle,
            description,
            date,
            venue,
            capacity,
            availableSeats:capacity
            //backend automatically initializes availableSeats to the same value.
        })
        res.status(201).json({
            success:true,
            message:"Event created successfully!",
            event
        })
    }catch(error){
        res.status(500).json({success:false,
            message:error.message
        })
    }
}
//2.To view all events ---
const getAllEvents = async(req,res)=>{
    try{
        const events = await Event.find()
          res.status(200).json({
            success:true,
            count:events.length,
            events})
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Server Error!"
        })
    }
}
//3. get an event by its Id..
const getEventById = async(req,res)=>{
    try{
    const event = await Event.findById(req.params.id)
    if(!event){
        return res.status(404).json({
            success:false,
            message:"Event not found!"
        })
    }
    res.status(200).json({
        success:true,
        event
    })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })

    }
}
//4.update event by Id..
const updateEvent = async(req,res)=>{
    try{
    const event = await Event.findByIdAndUpdate(req.params.id,req.body,
       { new:true,
        runValidators:true}
    )
    if(!event){
       return res.status(404).json({
        success:true,
        message:"Event not Found!!"
        })
    }
    res.status(200).json({
        success:true,
        message:"Event updated successfully!"
    })
}catch(error){
      res.status(500).json({
        success:false,
        message:error.message
        })
}
}
//4 delete an event by its Id.
const deleteEvent = async(req,res)=>{
    try{
    const event=await Event.findByIdAndDelete(req.params.id)
        if(!event){
       return res.status(404).json({
        success:false,
        message:"Event not Found!!"
        })
    }
    res.status(200).json({
        success:true,
        message:"Event deleted successfully!"
    })
    }catch(error){
      res.status(500).json({
        success:false,
        message:error.message
        })
    }
    
}
module.exports = {createEvent,
    getAllEvents , getEventById ,updateEvent, deleteEvent
}