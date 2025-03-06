import React, { useContext } from 'react'
import Login from './pages/Login'
import {toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext  } from './context/adminContext';
import { doctorContext  } from './context/doctorContext.jsx';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard';
import AllApoimtments from './pages/Admin/AllApoimtments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { Route, Routes } from 'react-router-dom';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import  DoctorAppointments from './pages/Doctor/DoctorAppointment';
const App = () => {
  const {aToken} = useContext(AdminContext);

  const {dToken} = useContext(doctorContext)

  return aToken || dToken ? (
  

    <div className="bg-[#F8F9FD]">
 

      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<></>}>
         

          </Route>
          <Route path="/admin-dashboard" element={<Dashboard/>}></Route>
          <Route path="/all-appointments" element={<AllApoimtments/>}></Route>
          <Route path="/add-doctor" element={<AddDoctor/>}></Route>
          <Route path="/doctor-list" element={<DoctorsList/>}></Route>
          
          
          
          //Doctor Route
          <Route path = "/doctor-dashboard" element = {<DoctorDashboard/>} />
          <Route path = "/doctor-profile" element = {<DoctorProfile/>} />
          <Route path = "/doctor-appointments" element = {<DoctorAppointments/>} />

        </Routes>

      
      </div>
      <ToastContainer/>
    </div>

  
  ):(
    <>
      
    <Login/>

    </>
  )
}

export default App;
