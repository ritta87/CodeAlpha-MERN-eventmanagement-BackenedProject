const dotenv = require('dotenv')
const express = require('express')

const connectDB = require ('./config/db')
dotenv.config()
connectDB()

const PORT = process.env.PORT|| 5001

const eventRoute = require('./routes/eventRouts')
const userRoute = require('./routes/userRoutes')
const registerRoute = require('./routes/registrationRoute')

const app = express()

//middleware
app.use(express.json())

//routes
app.use('/event',eventRoute)
app.use('/user',userRoute)
app.use('/register',registerRoute)



app.listen(PORT,()=>{
    console.log(`..Server is listening at http://localhost:${PORT}...`)
})