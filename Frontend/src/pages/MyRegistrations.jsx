
import { useNavigate } from "react-router-dom"
import api from "../api/api"
import { useState,useEffect } from "react"
import { Link } from "react-router-dom"


function MyRegistrations(){
const [register,setRegister] = useState([])
const navigate = useNavigate()

const getAllRegisteredEvents = async()=>{
    const token = localStorage.getItem('token')
    const response = await api.get('/register/myevent',{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
  
    setRegister(response.data.register)
}
function handleLogout(){
    localStorage.removeItem('token')
    Navigate('/')
}
const handleCancelRegistered = async (eventId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.delete(`/register/cancel/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert(response.data.message);

    // Refresh the registrations
    getAllRegisteredEvents();

  } catch (error) {
    console.log(error);
  }
};


useEffect(()=>{
    getAllRegisteredEvents()
},[])

    return(
        <>
          <nav className="user-navbar">
    <div className="user-brand">
      🎫 Event Hub
    </div>

    <div className="user-nav-links">
      <Link to="/home">Events</Link>

      <Link to="/myregistrations">
        My Registrations
      </Link>

      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  </nav>
   <main className="registrations-page">

    <h2>My Registered Events 🎟️</h2>
        {register.length===0 ? (
            <p className="no-registration">
                You have'nt registered for any upcoming event!
            </p>
        ):(
            <div className="registrations-container">
       
            {register.map((item)=>(
                <div className="registration-card"
                 key={item._id}>
                    <h3>{item.event?.eventTitle}</h3>
                    <button className="cancel-btn"
                     onClick={()=>handleCancelRegistered(item.event?._id)}>
                        Cancel</button>
                </div>
            ))}
            </div>
        )}
        </main>
      
        </>
    )
}
export default MyRegistrations