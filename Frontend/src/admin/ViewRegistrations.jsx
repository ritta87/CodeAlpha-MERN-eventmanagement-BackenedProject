import { useEffect, useState } from "react";
import api from "../api/api";
import AdminNavbar from "../components/AdminNavbar";
function ViewRegistrations() {

    const [registrations, setRegistrations] = useState([]);
    const [error, setError] = useState("");

    const getAllRegistrations = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/register/allRegistered",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log(response.data)
            setRegistrations(response.data.registeredEvents||[]);

        } catch (error) {

            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Can't connect to server!");
            }
        }
    };

    useEffect(() => {
        getAllRegistrations();
    }, []);
if(registrations.length===0){
    return <p>Not available</p>
}
    return (
        <>
        <AdminNavbar />
            <h2 className="page-title">All Registrations</h2>
            <p className="page-subtitle">
             View all registered users and their events
                </p>

            {error && <p className="form-error">{error}</p>}

             
            <div className="registration-container">
               {registrations.map((registration) => (
                    <div className="registration-card" key={registration._id}>

                        <h3>
                            {registration.event?.eventTitle}
                        </h3>

                        <p>
                            User: {registration.user?.name}
                        </p>

                        <p>
                            Email: {registration.user?.email}
                        </p>

                        <p>
                            Venue: {registration.event?.venue}
                        </p>
                       <p>
                Date: {new Date(registration.event?.date).toLocaleDateString()}
                </p>        

                    </div>
                ))
            }
            </div>
        </>
)
}


export default ViewRegistrations;