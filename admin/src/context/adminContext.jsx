import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [appointments , setAppointments] = useState([])
  const [aToken, setAToken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const [dashData, setDashData] = useState(false);

  const backendUrl = "http://localhost:4000";
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  //change available
  const changeAvailablity = async (docId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/admin/change-availablity",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
 //get all appointments
 const getAllAppointments = async()=>{
  try {
    const {data} =  await axios.get(`http://localhost:4000/api/admin/appointments`, {headers : {aToken}})
      if(data.success){
        console.log(data.appointments)
        setAppointments(data.appointments)
         
      }else{
        toast.error(data.message)
      }
  } catch (err) {
    toast.error(err.message)
  }
 }
 //cancel appointment 
 const cancelAppointment= async(appointmentId)=>{
  try {

    const {data} = await axios.post("http://localhost:4000/api/admin/cancel-apointment" , {appointmentId} , {headers:{aToken}})
    if(data.success){
      toast.success(data.message)
      getAllAppointments();
      // getAllDoctors();
    }else{
      toast.error(data.message)
    }
  } catch (err) {
    toast.error(err.message)
  }

 }
  
// get dashboard data from api 
const getDashData = async()=>{
   try {
    const {data} = await axios.get("http://localhost:4000/api/admin/dashboard" , {headers:{aToken}})
    if(data.success){
      setDashData(data.dashData)
  
    }else{
      toast.error(data.message)
    }
    
   } catch (err) {
    toast.error(err.message)
    
   }
}
  const value = {
    aToken,
    cancelAppointment,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    dashData,getDashData,
    changeAvailablity,
    appointments ,setAppointments , getAllAppointments
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
