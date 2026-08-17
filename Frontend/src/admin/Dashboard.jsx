import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function Dashboard(){
    const [events,setEvents] = useState([])
    const [error,setError] = useState('')
    const navigate = useNavigate()
    const getAllEvents = async()=>{
        try{
             const response = await api.get('/event/viewEvents')
             setEvents(response.data.events)
        }catch(error){
            if(error.response){
                setError(error.response.data.message)
            }else{
                setError("Can't connect to server!")
            }
        }
    }
    const handleLogout =()=>{
        localStorage.removeItem('token')
        navigate('/admin/login')
    }
    const handleDeleteEvent=async(eventId)=>{
        try{
            
        const token = localStorage.getItem('token')
         const response =   await api.delete(`/event/${eventId}`,
                {headers:{
                    Authorization:`Bearer ${token}`
                }}
            )
            alert(response.data.message)
            getAllEvents()
        }catch(error){
            console.log(error)
        }
    }
  useEffect(()=>{
    getAllEvents()
  },[])
if(events.length===0){
    return <p>No events available</p>
  }
return (
    <>
   <AdminNavbar/>
    <main className="admin-dashboard">
       <h2> Welcome Admin 👋</h2>
       <p className="dashboard-subtitle">
        Manage your events and registrations
        </p>
       
       <Link to="/admin/createEvent" className="create-event-btn">
       + Create A New Event</Link>
       

       <h2>Your Events 🎫</h2>
       <div className="event-container">
        {events.map((event) => (
                <div className="event-card" key={event._id}>

                    <h3>{event.eventTitle}</h3>

                    <p>{event.description}</p>

                    <p>📅 Date:{" "}
                {new Date(event.date).toLocaleDateString("en-GB")}
                    </p>

                    <p>📍 Venue: {event.venue}</p>

                    <p>👥 Capacity: {event.capacity}</p>

                    <p>
                   💺 Available Seats: {event.availableSeats}
                    </p>
                <div className="event-actions">
                    <button className="edit-btn" onClick={()=>
                    navigate(`/admin/editEvent/${event._id}`)}>
                    Edit
                    </button>
                    <button  className="delete-btn"
                     onClick={()=>{
                    if(window.confirm("Are you Sure?Delete this Event?")){
                    handleDeleteEvent(event._id)
                    }
                     }}
                     >
                    Delete</button>
                    </div>
                    
                </div>
               ))
               
            }     
         </div>      
       
 
 </main>
  </> )
}
export default Dashboard