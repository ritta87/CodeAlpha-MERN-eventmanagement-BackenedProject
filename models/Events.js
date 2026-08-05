const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
    eventTitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    venue:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,
        required:true,
        min:1
    },
    availableSeats:{
        type:Number,
        min:0,
        default:function(){
            return this.capacity
        }
    }
})
module.exports = mongoose.model("Event",eventSchema)