import { useState } from "react"
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
function CreateEvent(){
    const [error,setError]=useState('')
    const navigate = useNavigate()
 const [event, setEvent] = useState({
        eventTitle: "",
        description: "",
        date: "",
        venue: "",
        capacity: ""
    })

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        })
    }

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/event/create",
                event,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert(response.data.message)
            navigate('/admin/dashboard')

        } catch (error) {
               if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Can't connect to server!");
            }
        }
        }
    
    return (
        <>
        <AdminNavbar />
            <h2 className="page-title">Create New Event</h2>
            <p className="page-subtitle">
            Fill in the details to create a new event
            </p>

            <form className="event-form" onSubmit={handleCreateEvent}>

                <input
                    type="text"
                    name="eventTitle"
                    value={event.eventTitle}
                    onChange={handleChange}
                    placeholder="Enter event title"
                />

                <textarea
                    name="description"
                    value={event.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                />

                <input
                    type="date"
                    name="date"
                    value={event.date}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="venue"
                    value={event.venue}
                    onChange={handleChange}
                    placeholder="Enter event venue"/>
                

                <input
                    type="number"
                    name="capacity"
                    value={event.capacity}
                    onChange={handleChange}
                    placeholder="Enter capacity"/>
                
            <div className="form-actions">
                <div className="form-buttons">
                <button type="submit" className="create-submit-btn">
                Create Event
                </button>
                <button type="button"
                className="cancel-btn" 
                onClick={()=>navigate('/admin/dashboard')}>
                Cancel</button>
                </div>
                 {error && <p className="form-error">{error}</p>}
            </div>
            </form>
        </>
    )
}
export default CreateEvent