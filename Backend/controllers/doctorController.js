// chanange available
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available
    });
    res.json({success: true, message: "Availablity changed" });
  } catch (err) {
    res.json({ success: false,message: err.message });
  }
};
//add doctors
const doctorList  = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(['-password' ,'-email'])
    res.json({success: true, doctors})
  } catch (err) {
    res.json({ success: false,message:err.message });
  }
}
// api for doctor login
const loginDoctor = async(req ,res)=>{
  try{
     const {email, password} = req.body;
     const doctor = await doctorModel.findOne({email})
     console.log(doctor)
      if(!doctor){
        return res.json({success:false, message : "Invalid credentials"})

      }
      const isMatch = await bcrypt.compare(password, doctor.password);
      if(isMatch){
        const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
        res.json({success:true ,token})
      }else{
        res.json({success:false,message :"Invalid credentials"})
      }
  }catch(err){
    res.json({success:false , message : err.message})
  }
}
//api for all appointments for doctor panel
const appointmentsDoctor = async(req, res)=>{
  try{
    const {docId} = req.body;
   

    const appointments = await appointmentModel.find({docId});

     
     
    res.json({success:true, appointments})
  }catch(err){
    res.json({success:false , message : err.message})
  }
}


//api to mark appointment copleted for doctor panel

const appointmentComplete = async(req ,res )=>{
    try {
      const {docId , appointmentId} = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId)
      
      if(appointmentData && appointmentData.docId === docId){
       
       
        await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted:true})
      
        return res.json({success:true, message:'Appointment Completed'})
        
      } else{
        return res.json({success:false, message:' Mark Failed'})
      }
    } catch (err) {

      res.json({success:false, message:err.message})
    }
}
//cancle appointment
const appointmentCancel = async(req ,res )=>{
    try {
      const {docId , appointmentId} = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId)
      if(appointmentData && appointmentData.docId ===docId){
       
       
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
      
        return res.json({success:true, message:'Appointment Cancelled'})
        
      } else{
        return res.json({success:false, message:' Cancel Failed'})
      }
    } catch (err) {

      res.json({success:false, message:err.message})
    }
}
const doctorDashboard= async(req,res)=>{
  try{
    const {docId} =req.body;
    const appointments = await appointmentModel.find({docId})
    let earnings= 0 ;
    appointments.map((item)=>{
      if(item.isCompleted || item.payment){
        earnings+=item.amount
      }
    })
    let patients= []
    appointments.map((item)=>{
      if(!patients.includes(item.userId)){
         patients.push(item.userId)
      }
    })
    console.log(patients)
    const dashData = {
      earnings,
      appointments:appointments.length,
      patients:patients.length,
      latestAppointments:appointments.reverse().slice(0,5)
    }
    res.json({success:true, dashData})
  }catch(err){
    return res.json({success:false, message:err.message})
  }
}
// api to get doctor profile
const doctorProfile = async(req, res)=>{
  try{
    const {docId} = req.body;
    const profileData = await doctorModel.findById(docId).select('-password')
    
    res.json({success:true, profileData})

  }catch(err){
    res.json({success:false, message:err.message})
  }

}
//api to update doctor profile from doctor panel 
const updateDoctorProfile = async(req ,res)=>{
 try{
  const { docId , fees , address , available} = req.body;
    await doctorModel.findByIdAndUpdate(docId, {fees, address,available})
    res.json({success:true, message:"Profile Updated"})
 }catch(err){
  res.json({success:false , message : err.message})
 }

}
export {updateDoctorProfile,doctorProfile, changeAvailablity , appointmentsDoctor , doctorList , loginDoctor ,appointmentCancel , appointmentComplete , doctorDashboard};
