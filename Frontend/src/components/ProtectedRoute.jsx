
import { Navigate, useNavigate } from "react-router-dom"

function ProtectedRoute({children}){
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to="/"></Navigate>
    }
    return children
}
export default ProtectedRoute