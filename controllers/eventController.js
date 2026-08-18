const Event = require('../models/Events')
const Registration = require('../models/Registration')
//1.create an event
const createEvent = async (req,res)=>{
    try{
        const {eventTitle,description,date,venue,capacity,availableSeats} = req.body
      
    
    if(!eventTitle || !description || !venue ){
        return res.status(400).json({
            success:false,message:"All fields are required!!"
        })
    }
    if(!capacity||capacity<=0){
        return res.status(400).json({
            status:false,
            message:"Capacity must be a valid number!"
        })
    }
if(!date) {
    return res.status(400).json({
        success: false,
        message: "Event date is required"
    })
}
const eventDate = new Date(date);

if (eventDate < new Date()) {
    return res.status(400).json({
        success: false,
        message: "Event date cannot be in the past"
    })
}
 const event = await Event.create({
            eventTitle,
            description,
            date,
            venue,
            capacity,
            availableSeats:capacity})
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
    console.log(event)
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
//4.update event by Id,capacity and seats get updated..
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found!"
      });
    }

    const {
      eventTitle,
      description,
      date,
      venue,
      capacity
    } = req.body;

    // Validate date only if date is being updated
    if (date !== undefined) {
      const eventDate = new Date(date);

      if (isNaN(eventDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid event date"
        });
      }

      if (eventDate < new Date()) {
        return res.status(400).json({
          success: false,
          message: "Event date cannot be in the past"
        });
      }

      event.date = eventDate;
    }

    // Validate capacity only if capacity is being updated
    if (capacity !== undefined) {
      const newCapacity = Number(capacity);

      if (isNaN(newCapacity) || newCapacity < 1) {
        return res.status(400).json({
          success: false,
          message: "Capacity must be a valid positive number"
        });
      }

      const registeredCount = await Registration.countDocuments({
        event: req.params.id
      });

      if (newCapacity < registeredCount) {
        return res.status(400).json({
          success: false,
          message: `Capacity cannot be less than registered users (${registeredCount}).`
        });
      }

      event.capacity = newCapacity;
      event.availableSeats = newCapacity - registeredCount;
    }

    // Update only supplied fields
    if (eventTitle !== undefined) {
      event.eventTitle = eventTitle;
    }

    if (description !== undefined) {
      event.description = description;
    }

    if (venue !== undefined) {
      event.venue = venue;
    }

    await event.save();

    return res.status(200).json({
      success: true,
      message: "Event updated successfully!"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
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