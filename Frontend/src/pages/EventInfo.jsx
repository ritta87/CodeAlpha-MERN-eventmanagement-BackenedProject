import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/api"
import { Link } from "react-router-dom"

function EventInfo(){
    const {eventId}= useParams()
    const [event,setEvent] = useState(null)
    const [message,setMessage]=useState('')
    const navigate = useNavigate()
    const handleRegister = async()=>{
        try{
           const token = localStorage.getItem('token')
           
            const response = await api.post('/register/event',
            {
                eventId:event._id
            },
            {
            headers: {
            Authorization: `Bearer ${token}`
            }
            }
            )
            setMessage(response.data.message)
        }catch(error){
            setMessage(error.response.data.message)
        }
    }
    function handleLogout(){
        localStorage.removeItem('token')
        navigate('/')
    }
    const getSingleEvent = async()=>{
        try{
            const response = await api.get(`/event/${eventId}`)
           
            setEvent(response.data.event)
        }catch(error){
            console.log(error)
        }
    }
    
    useEffect(()=>{
        getSingleEvent()
    },[])
    if (!event) {
    return <h2>Loading...</h2>
}

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
<main className="event-info-page">

    <div className="event-info-card">

      <h2>Event Information 🎫</h2>
         

        <h3>{event.eventTitle}</h3>

        <p className="event-description">Description: {event.description}</p>
        <div className="event-details">
        <p>📍 <strong>Venue: </strong>
         {event.venue}</p>

        <p>
          📅 <strong>Date:</strong>{" "}
          {new Date(event.date).toLocaleDateString("en-GB")}
        </p>

        <p>💺 <strong>Available Seats: </strong>
        {event.availableSeats}</p>
        

        <button type="button" onClick={handleRegister} 
        className="register-btn"
        disabled={event.availableSeats===0}>
        {event.availableSeats===0 ? "No Seats Available!":
            "Register For Event"}
        </button>
        {message && (<p className="registration-message">{message}
            </p>)}
            </div>
</div></main>
        </>
    )
}
export default EventInfo