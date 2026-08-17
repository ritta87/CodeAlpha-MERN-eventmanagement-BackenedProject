const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const User = require('../models/User')
//1.register a new user.
const userRegister = async(req,res)=>{
    try{
        const {name,email,password} =req.body
        if(!name||!email||!password){
            return res.status(400).json({
                success:false,message:"All fields are required!!"
            })
        }
    if (name.trim().length < 3) {
    return res.status(400).json({
        success: false,
        message: "Name must be at least 3 characters"
    })
}
if (typeof name !== "string") {
    return res.status(400).json({
        success: false,
        message: "Name must be a string"
    })
}
if (!email.includes("@")) {
    return res.status(400).json({
        success: false,
        message: "Please enter a valid email"
    })
}

if (password.length < 6) {
    return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
    })
}
        const hashedPassword = await bcrypt.hash(req.body.password,10)
        const user = await User.create({
            ...req.body,
        password:hashedPassword
    })
    res.status(201).json({
        success:true,
        message:"User created successfully!",
        user
    })
    }catch(error){
        res.status(500).json({
        success:false,
        message:error.message
        })
    }

}
//2.login after registration-email+password.
const loginUser = async(req,res)=>{
try{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            status:false,
            message:"Please Enter Email and Password!"
        })
    }
if (!email.includes("@")) {
    return res.status(400).json({
        success: false,
        message: "Please enter a valid email"
    })
}

if (password.length < 6) {
    return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters"
    })
}
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({
            success:false,
            message:"No such user exists!"
        })
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(401).json({
            success:false,
            message:"Invalid credentials!"
        })
    }
    //Generate token  for verified user..
    const token = jwt.sign(
        {id:user._id,
         role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    )
    res.status(200).json({
        success:true,
        message:"Logged In successfully!",
        token
    })
}catch(error){
 res.status(500).json({
    success: false,
    message: error.message
        })
}
}
//3.user authenticated,token verified- to event home page 
const userHome = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Home page - welcome user",
        
    })
}

module.exports = {userRegister,loginUser,userHome}