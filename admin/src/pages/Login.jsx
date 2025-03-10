import React, { useContext } from "react";
import { useState } from "react";
import { AdminContext } from "../context/adminContext.jsx";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import {doctorContext} from '../context/doctorContext.jsx'

function Login() {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const {setdToken} =useContext(doctorContext)

 
  const { setAToken, backendUrl } = useContext(AdminContext);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state == "Admin") {

        const { data } = await axios.post("https://doctora-appointments-api.vercel.app/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("atoken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const {data} = await axios.post("https://doctora-appointments-api.vercel.app/api/doctor/login" , {email , password})
          if(data.success){
            localStorage.setItem('dToken' , data.token)
            setdToken(data.token)
          
            

          }else{
            toast.error(data.message)
          }
        
      }
    } catch (err) {}
  };
  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg ">
          <p className="text-2xl font-semibold m-auto">
            <span className="text-primary">{state} </span>
            Login
          </p>
          <div className="w-full">
            <p>Email</p>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="email"
              required
            />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border border-[#DADADA] rounded w-full p-2 mt-1"
              type="password"
              required
            />
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md text-base cursor-pointer ">
            Login
          </button>
          {state === "Admin" ? (
            <p>
              Docotr Login ?
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Doctor")}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Admin Login ?
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Admin")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    <ToastContainer/>
    </div>
  );
}

export default Login;
