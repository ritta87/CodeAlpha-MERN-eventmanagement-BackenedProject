import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import EventInfo from './pages/EventInfo'
import MyRegistrations from './pages/MyRegistrations'
import ProtectedRoute from './components/ProtectedRoute'

import AdminLogin from './admin/AdminLogin'
import Dashboard from './admin/Dashboard'
import CreateEvent from './admin/CreateEvent'
import ManageEvent from './admin/ManageEvent'
import ViewRegistrations from './admin/ViewRegistrations'
import AdminProtectedRoute from './components/AdminProtectedRoute'

function App() {

  return (
    <>
    
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={<ProtectedRoute>
          <Home/>
          </ProtectedRoute>
        }></Route>
        <Route path='/event/:eventId' element={<ProtectedRoute><EventInfo />
        </ProtectedRoute>}></Route>
        <Route path='/myregistrations' element={<ProtectedRoute><MyRegistrations/>
        </ProtectedRoute>}></Route>
      

          <Route path='/admin/login' element={<AdminLogin/>}>
          </Route>
        <Route path='/admin/dashboard' element={<AdminProtectedRoute><Dashboard />
        </AdminProtectedRoute> } >
        </Route>
          <Route path='/admin/createEvent' element={<AdminProtectedRoute>
            <CreateEvent /></AdminProtectedRoute>}>
          </Route>

       <Route path='/admin/editEvent/:eventId'
        element={<AdminProtectedRoute>
          <ManageEvent />
        </AdminProtectedRoute>} />
       
          <Route path='/admin/registeredevents'
           element={<AdminProtectedRoute><ViewRegistrations />
           </AdminProtectedRoute>}/>      
      </Routes>
      </BrowserRouter>   
    
    </>
  )
}

export default App
