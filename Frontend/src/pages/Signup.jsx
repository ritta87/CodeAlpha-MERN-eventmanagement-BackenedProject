import { useState } from "react"
import { Link } from "react-router-dom"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

function Signup(){
    const[name,setName]=useState('')
   const [email,setEmail]=useState('')
   const [password,setPassword]=useState('')
   const [error,setError]=useState('')
   const navigate = useNavigate()
   const handleSignup = async(e)=>{
    try{
    e.preventDefault()
    const response = await api.post('/user/signup',{
        name,email,password
    })
    console.log(response.data)
    navigate('/')
}catch(error){
    console.log(error)
      if (error.response) {
            setError(error.response.data.message);
            } else {
            setError("Can't connect to server!");
            }}
   }

    return(
        <>
        <div className="signup-page">
            <div className="signup-card">
                <h2>Create an Account</h2>
        <p className="signup-subtitle">
        Join Event Hub and discover exciting tech events
      </p>

       <form onSubmit={handleSignup} className="signup-form">
        <div className="signup-field">
         <label>Name</label>
        <input type="text"  placeholder="Enter your name"
         value={name} onChange={(e) => setName(e.target.value)} /> 
         </div> 
         <div className="signup-field"> 
        <label>Email</label>
         <input type="email" name="email" placeholder="Enter your Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} />
         </div>
          <div className="signup-field"> 
            <label>Password</label> 
            <input type="password" name="password"
            placeholder="Enter password" value={password} 
          onChange={(e) => setPassword(e.target.value)} />
        </div>
         <button type="submit" className="signup-btn">Submit</button> 
         {error && <p className="form-error" >{error}</p>}
        </form>
        <p className="signup-login-link">
            Already have an account? 
            <Link to="/">  Login</Link>
        </p>
        </div>
        </div>
        </>
    )
}
export default Signup