import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/Context.jsx";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import {toast} from "react-toastify"

function Appointment() {
  const navigate = useNavigate();

  const { docId } = useParams();
  const { doctors, currencySymbol , token , getdoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI' , 'SAT'];
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // date
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSloteTime] = useState('');
  const getAvailableSlots = async () => {
    setDocSlots([]);
    // getting current date
    let today = new Date();
    for (let i = 0 ; i < 7; i++) {
      //getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // settings end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      //setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlotes = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
       
        });
        let day  = currentDate.getDate();
        let month = currentDate.getMonth();
        let year= currentDate.getFullYear();
        // getting doctor's slots
        const  slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime
      
        const isSlotAvailable = docInfo.slots_booked[slotDate] && slotInfo.slots_booked[slotDate].includes(slotTime)  ? false  : true ;
        
        
        if(isSlotAvailable){
            timeSlotes.push({
              datetime: new Date(currentDate),
              time: formattedTime,
            });
          }
        // add slot to array
        
        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => ([...prev , timeSlotes]));
    }
  };

const bookAppointment = async ( ) =>{
  if(!token){
      toast.warn("Please Login to Book an appointment")
      return navigate('/login');


  
  }

  try {
    const date = docSlots[slotIndex][0].datetime
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const  slotDate = day + "_" + month + "_" + year;
      const {data } = await axios.post("https://doctora-appointments-api.vercel.app/api/user/book-appointment" , {docId , slotDate, slotTime } , {headers : {token}} )
      if(data.success){
        toast.success(data.message)
        getdoctorsData();
        navigate('/my-appointments')
        
      }else{
        toast.error(data.message)
      }

    
  } catch (err) {
    toast.error(err.message)
  }

}

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);
  useEffect(() => {

  }, [docSlots]);
  useEffect(() => {
    fetchDocInfo();
  
  }, [doctors, docId]);
  return (
    docInfo && (
      <div>
        {/* { 
        
      ---------Doctor Details
      } */}
      {
        console.log(docInfo , "this ne w")
      }
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg "
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex- border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {
              //  Doc Info :name , degree , experinence -----
            }
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {
              //  doctor about
            }
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3 ">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee :{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
        {
          // BOOKING SLOTS
        }
        <div className="sm:ml-72 sm:pl-4 font-medium text-gray-700">
            <p>
              Booking slots
            </p>
            <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {
                docSlots.length  && docSlots.map((item ,index)=>(
                      <div onClick={()=>{
                        setSlotIndex(index)
                      }} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                        <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                        <p>{item[0] && item[0].datetime.getDate()}</p>

                        </div>
                ))
              }


            </div>
            <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
              {docSlots.length && docSlots[slotIndex].map((item , index)=>(
                <p onClick={()=>{
                  setSloteTime(item.time)
                }} key={index} className={`text-sm font-light flex-shrink-0 px-6 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'} `} >
                  {item.time.toLowerCase()}
                  </p>
              )) }
            </div>
            <button onClick={bookAppointment} className="bg-primary py-3 text-white text-sm font-light rounded-full my-6 px-14">
              Book an appointment
            </button>
        </div>
        {
            //listing Related Doctors
        }
        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
      </div>
    )
  );
}

export default Appointment;
