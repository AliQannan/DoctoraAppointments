import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !gender || !dob) {
      return res.json({
        success: false,
        message: "Data Missing",
        name,
        dob,
        phone,
        gender,
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      // update user image in database
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "Successfully updated user " });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor is not available" });
    }
    let slots_booked = docData.slots_booked;
    // Create a new slot
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot is already booked" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      slotTime,
      amount: docData.fees,
      slotDate,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();
    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked,
    });
    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

//api to get user appointment for frontednd my-appointment page
const list_Appointment = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (err) {
    console.log(err);
     res.json({ success: false, message: err.message });
  }
};

//api for cancel appointments
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
 
    const appointmentData = await appointmentModel.findById(appointmentId);

    //verfiy appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "unauthorized user" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    console.log(appointmentModel);
    //release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
 res.json({success:true ,message : "cancelled successfully" }); 
    
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
// get all oppointments list
const  appointmentAdmin = async(req ,res)=>{
  try {
    const appointments = await appointmentModel.find({})
    res.json({success:true , appointments})


  } catch (err) {

    res.json({success:false  , message:err.message})

  }
}

export {
  getProfile,
  updateProfile,
  bookAppointment,
  list_Appointment,
  cancelAppointment,
  appointmentAdmin
};
