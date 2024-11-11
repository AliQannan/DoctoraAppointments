import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/adminContext'
import { doctorContext } from '../context/doctorContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    
    const {aToken , setAToken} = useContext(AdminContext)
    const {dToken ,setdToken} = useContext(doctorContext)
    const navigate = useNavigate()
  const logout = ()=>{
    
   
    if(aToken){
      navigate('/')
      aToken && setAToken('');
    return    localStorage.removeItem('atoken'); 
  }
    
    if(dToken){
      navigate('/')
      dToken && setdToken('');
      return    localStorage.removeItem('dToken');
    }
  
  }
  
    return (
    <nav  className='flex justify-between items-center px-4 py-3 sm:px-10 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
                {aToken ? 'Admin' : 'Doctor'}
            </p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full '>
            Logout
        </button>


    </nav>
  )
}

export default Navbar