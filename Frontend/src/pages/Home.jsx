import { useEffect, useState } from "react"
import api from "../api/api"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function Home(){
    const [events,setEvents]= useState([])
    const navigate = useNavigate()
    const handleMyRegistration = ()=>{
        navigate('/myregistrations')
    }
    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/')
    }
    const getEvents = async()=>{
        try{
            const response = await api.get('/event/viewEvents')
            setEvents(response.data.events)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getEvents()
    },[])
    return (
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


<main className="user-home">
    <div className="user-welcome">

        <h2>Welcome User...</h2>
        <p>
         Discover exciting events and reserve your seat!
        </p>
    </div>
        <h2 className="events-heading">Upcoming Events🎫</h2>
        <div className="user-event-container">
        {events.map((event)=>(
            <div  className="user-event-card" key={event._id}>
                <button type="button" 
                onClick={(e)=>{
                    e.stopPropagation()
                    navigate(`/event/${event._id}`)
                }}
                >View Event</button>
                
            </div>
        )
        )}
        </div></main>
        </>
    )
}
export default Home