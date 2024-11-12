import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoutes.js";


//app config

const app = express();

const port = process.env.Port || 4000;

connectCloudinary();

// middlewares
app.use(express.json());
  
app.use(cors({
  origin: "",  // alllow all origines for testing ?
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,  // Corrected typo here
}));


 
//endpoints

app.use("/api/admin", adminRouter);
app.use("/api/doctor" , doctorRouter)
app.use("/api/user" , userRouter)
//localhost:4000/api/admin/add-doctor

app.get("/",    connectDB,(req, res) => {
 
  res.json("API WORKING VERY GOOD ...!");
});



app.listen(port, ( ) => {
  console.log("server is running on port");
 
});
