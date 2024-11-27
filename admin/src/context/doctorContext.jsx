import { createContext } from "react";
import {useState} from 'react'
import {toast} from "react-toastify"
export const doctorContext = createContext();

import axios from 'axios';

const DoctorContextProvider = (props ) =>{
    const [dToken, setdToken] = useState( localStorage.getItem("dToken") ? localStorage.getItem("dToken") : "");
    const [appointments, setAppointments] = useState ([])
    const [dashData, setDashData] = useState([])
    const [profileData, setProfileData] =useState(false)
  const getAppointments = async()=>{
    try{
        const  {data} = await axios.get("https://doctora-appointments-api.vercel.app/api/doctor/appointments", {headers:{dToken}})
          
        if(data.success){
           
           
           setAppointments(data.appointments.reverse())
           
        }else{
            toast.error(data.messasge)
        }
    }catch(err){
        toast.error(err.message)
    }
  }
    
const completeAppointment= async(appointmentId)=>{
    try{
        const {data} = await axios.post("https://doctora-appointments-api.vercel.app/api/doctor/complete-appointment" , {appointmentId} ,{headers:{dToken}})
        
        if(data.success){
            toast.success(data.message)
            getAppointments()
        }else{
            toast.error(data.message)
        }
   
   
   
    }catch(err){
        toast.error(err.message)
    }
}
    const cancelAppointment= async(appointmentId)=>{
    try{
        
        const {data} = await axios.post("https://doctora-appointments-api.vercel.app/api/doctor/cancel-appointment" , {appointmentId} ,{headers:{dToken}})
        
      
        if(data.success){
            toast.success(data.message)
            getAppointments()

        }else{
            toast.error(data.message)
        }
   
   
   
    }catch(err){
        toast.error(err.message)
    }
}
    
    
   const   getDashData = async()=>{
     const {data} = await axios.get("https://doctora-appointments-api.vercel.app/api/doctor/dashboard", {headers:{dToken}})
     if(data.success){
      setDashData(data.dashData)
     }else{
        toast.error(data.message)
     }
   
   
    }    

        const getProfile = async()=>{
            try{
                const {data} = await axios.get("https://doctora-appointments-api.vercel.app/api/doctor/profile" , {headers:{dToken}})
                 
                if(data.success){
                    toast.success(data.message)
                    setProfileData(data.profileData)
                }
            }catch(err){
                toast.error(err.message)
            }
        }
        
    
    const value ={
        profileData,getProfile,setProfileData,
        dashData, setDashData ,getDashData,
        completeAppointment,cancelAppointment,
        dToken , setdToken,
        getAppointments , appointments , setAppointments
    }
    return(
        <doctorContext.Provider value={value} >
            {props.children}
        </doctorContext.Provider >
    )
}



export default DoctorContextProvider;