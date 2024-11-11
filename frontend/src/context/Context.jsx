import { createContext, useEffect, useState } from "react";
import  axios  from "axios";
import { toast } from "react-toastify";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const [token , setToken ] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false )
    const [userData , setUserData] = useState(false)
  const [doctors, setDoctors] = useState([]);
  const getdoctorsData = async () => {
    try {
      const { data } = await axios.get("https://doctora-appointments-api.vercel.app/api/doctor/list");
          console.log(data)
      if (data.success) {
        setDoctors(data.doctors);
      }else{
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const loadUserProfileData = async () => {
      try{
        const {data } = await axios.get("http://https://doctora-appointments-api.vercel.app/api/user/profile", {headers :{token}} )
            console.log(data , "this is my data loaded")
        if(data.success){
            setUserData(data.userData)
        }else{
          toast.error(data.message);
        }
      }catch(err){
        toast.error(err.message);
      }
  }


  const value = {
    doctors,getdoctorsData,
    currencySymbol,
    token , setToken,
    userData, setUserData,loadUserProfileData
    
  };
  useEffect(() => {
            getdoctorsData();
  }, []);
  useEffect(()=>{
    if(token) {
      loadUserProfileData();
    }else{
      setUserData(false);
    }
    }
 ,[token])
 
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
