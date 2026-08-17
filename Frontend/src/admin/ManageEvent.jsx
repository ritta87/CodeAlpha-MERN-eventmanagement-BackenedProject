
import { useState,useEffect } from "react"
import api from "../api/api"
import { useNavigate, useParams } from "react-router-dom"
import AdminNavbar from "../components/AdminNavbar"
function ManageEvent(){
    const [error,setError]=useState('')
    const {eventId} = useParams()
   const navigate = useNavigate()
    const [event,setEvent] = useState({
        eventTitle:'',
        description:'',
        date:'',
        venue:'',
        capacity:''
    })
    const getEvent=async()=>{
        try{
            const response = await api.get(`/event/${eventId}`)
            const data=response.data.event
            setEvent({
                eventTitle:data.eventTitle||'',
                description:data.description||'',
                venue:data.description||'',
                capacity:data.capacity||'',
                data: data.date ? data.date.slice(0,10) :'',
            })
        }catch(error){
           console.log(error)
        }
       
        
    }
    const handleUpdate = async(e)=>{
        e.preventDefault()
        try{
            const token = localStorage.getItem('token')
            const response = await api.put(`/event/${eventId}`,
                event,
                {headers:{Authorization:`Bearer ${token}`}
            })
            alert(response.data.message)
            navigate('/admin/dashboard')
        }catch(error){
            if(error.response){
                setError(error.response.data.message)
            }else{
                setError("Cant connect to server!")
            }
        }
    }
    const handlechange=async(e)=>{
        setEvent({
            ...event,
            [e.target.name]:e.target.value
        })
    }
    useEffect(()=>{
        getEvent()
    },[eventId])

    return (
        <>
        <AdminNavbar />
        <h2 className="page-title">Edit Event</h2>
         <p className="page-subtitle">
         Update the event details
        </p>

        <form className="event-form" onSubmit={handleUpdate}>

        <input type="text" name="eventTitle"
        value={event.eventTitle||''} onChange={handlechange}
        placeholder="Event Title"/>

        <textarea name="description" value={event.description||''}
        onChange={handlechange} placeholder="Description">

        </textarea>
        <input type="date" name="date" value={event.date||''}
        onChange={handlechange}/>
        <input type="text" name="venue" value={event.venue}
        onChange={handlechange} placeholder="Venue"/>

        <input type="number" name="capacity"
        value={event.capacity || ""}
        onChange={handlechange} placeholder="Capacity"/>
    <div className="form-actions">
        <div className="form-buttons">
        <button type="submit" className="create-submit-btn">
            Update Event</button>
        <button type="button" className="cancel-btn" onClick={()=>navigate('/admin/dashboard')}>
            Cancel
        </button>
    </div>
    {error && <p className="form-error">{error}</p>}
    </div>
        </form>
        </>
    )
}
export default ManageEvent