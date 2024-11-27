import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;

    // Check for missing fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    // Validate password length
    if (!validator.isLength(password, { min: 8 })) {
      return res.json({
        success: false,
        message: "Password should be at least 8 characters long",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Prepare doctor data
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address), // Assuming address is a JSON string
      date: Date.now(),
    };

    // Use Mongoose model to create and save doctor
    const newDoctor = new doctorModel(doctorData); // Use the model to create an instance
    await newDoctor.save(); // Correct save method

    // Success response
    res.json({ success: true, message: "Doctor Added Successfully" });
  } catch (err) {
    console.log("Error: ", err);
    res.json({ success: false, message: err.message });
  }
};

//api for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: "admin does not exist" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (isMatch) {
      const atoken = jwt.sign({ id: admin._id },"aliqannan");
      res.json({ success: true, atoken });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
//api to get all doctors list for admin panel
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
//Api for appointment cancellation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    //verfiy appointment user

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //release doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
// api to get dashboard data from admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({});
   

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};
export { addDoctor, loginAdmin, adminDashboard, allDoctors, appointmentCancel };
