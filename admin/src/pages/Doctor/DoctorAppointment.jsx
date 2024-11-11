import React , {useEffect , useContext} from 'react' ;
import  {doctorContext} from '../../context/doctorContext.jsx'
import {AppContext} from "../../context/appContext.jsx"
import { assets } from '../../assets/assets.js';
const DoctorAppointments = ()=>{
    const {appointments, getAppointments , dToken} = useContext(doctorContext)
    
    const {cancelAppointment , completeAppointment} = useContext(doctorContext)
       useEffect(()=>{
        getAppointments()
       
      

        },[dToken])
    
       const {calclateAge, slotDateFormat , currency} = useContext(AppContext)
    
    
    return (
        
    <div className ='w-full max-w-6xl m-5'>
      
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
        <div className='bg-white border rounded text-sm max-h-[50vh] overflow-y-scroll'></div>
    
    
    <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>

        <p>#</p>
        <p>Patient</p>
        <p>Payment</p>
        <p>Age</p>
        <p>Date&Time</p>
        <p>Fees</p>
        <p>Action</p>


    </div>
    {
        console.log(appointments)
    }
   
    {
       appointments && appointments.map((item, index)=>{
            return(
                <div className='flex flex-wrap justify-between max-sm:gap-5  max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100' key={index}>
                        <p className='max-sm:hidden'>{index + 1}</p>
                        <div className='flex items-center gap-2'>
                            <img className='w-8 rounded-full ' src={item.userData.image}  alt=""/><p>{item.userData.name}</p>
                        </div>
                        <div>
                            <p className='text-xs inline border border-primary px-2 rounded-full'>{item.payment ? "Online" :"CASH"}</p>
                            </div>
                            <p className='max-sm:hidden'>{calclateAge(item.userData.dob)}</p>
                   
                                <p>{slotDateFormat(item.slotDate) } , {item.slotTime}</p>
                            <p>{currency}{item.amount}</p>
                           
                           {
                            item.cancelled?<p className='text-red-500'>Cancelled</p>:item.isCompleted? <p className='text-green-500'>Completed</p> :                           
                           
                            <div className='flex'>
                                <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt=""/>
                                <img onClick={()=>completeAppointment(item._id)}  className='w-10 cursor-pointer' src={assets.tick_icon} alt=""/>
                            </div>
                           }
                           
                           
                           

                   
                   
                   
                   
                   
                    </div>
            )



        })
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </div>
    )
}



export default DoctorAppointments;