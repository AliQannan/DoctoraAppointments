import express from "express";
import {changeAvailablity} from '../controllers/doctorController.js'
import { addDoctor  , allDoctors, appointmentCancel, loginAdmin , adminDashboard} from "../controllers/adminController.js";
// using multer to upload 
import authAdmin from "../middlewares/authAdmin.js"
import upload from "../middlewares/multer.js";
import { appointmentAdmin } from "../controllers/getProfile.js";
// create admin router
const adminRouter = express.Router();
// create a new doctor
adminRouter.post("/add-doctor",authAdmin, upload.single("image"), addDoctor);
//

adminRouter.post("/login" , loginAdmin)
adminRouter.post("/all-doctors" , authAdmin , allDoctors)
adminRouter.post("/change-availablity" , authAdmin , changeAvailablity)
adminRouter.get("/appointments" , authAdmin , appointmentAdmin)
adminRouter.post('/cancel-apointment', authAdmin , appointmentCancel)
adminRouter.get('/dashboard', authAdmin , adminDashboard)


export default adminRouter;

