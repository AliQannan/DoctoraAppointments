import express from 'express';
import { registerUser,loginUser   } from '../controllers/userController.js';
import authUser from "../middlewares/authUser.js";
import { getProfile , updateProfile  ,bookAppointment, list_Appointment , cancelAppointment} from '../controllers/getProfile.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

//end point 
userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/profile',authUser , getProfile)
userRouter.post('/update-profile', upload.single('image') , authUser , updateProfile)
userRouter.post('/book-appointment' , authUser , bookAppointment);
userRouter.get('/appointments', authUser, list_Appointment);
userRouter.post('/remove-appointment', authUser,  cancelAppointment);

export default userRouter ;
