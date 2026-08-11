import { useState } from "react"
import api from "../api/api"
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom"
function Login(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')
    const navigate = useNavigate()
    const handleLogin = async(e)=>{
        try{
            e.preventDefault()
            const response = await api.post('/user/login',{
                email,
                password
            })
            localStorage.setItem('token',response.data.token)
            navigate('/home')
        }catch(error){
           if(error.response){
            setError(error.response.data.message)
           }else{
            setError("Cannot connect to server")
           }
        }
    }
    return (
        <>
        <div className="login-page">
            <div className="login-intro">
                <h1>🎫 Event Hub</h1>
                   <h3>Discover. Register. Participate.</h3>

                 <p> Discover tech events, connect with like-minded people,
                and grow your skills.
                
                    </p>
        <div className="login-features">
        <span>📅 Discover Events</span>
        <span>🎟️ Easy Registration</span>
      </div>
        </div>


     <div className="login-card">
         <h2>Welcome to Event Hub 👋</h2>
            <p className="login-subtitle">
                Login to register for events
                 </p>      
      <form onSubmit={handleLogin} className="login-form">
        <input type="email" placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        ></input>
        
        <input type="password" placeholder="Enter password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        ></input>
        
        <button type="submit">Login</button>
          
        {error && <p className="login-error">{error}</p>}
        </form> 
        <p className="user-login-link">New User ?  
            <Link to ="/signup" >   Signup</Link>
        </p>
        
    </div></div>
    </>
    )
}
export default Login