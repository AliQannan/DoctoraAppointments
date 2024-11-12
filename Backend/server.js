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
app.use((req, res, next) => {
  res.header("X-Custom-Header", "CORS-Test"); // Add a custom header to check
  next();
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://doctora-appointments-users.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const port = process.env.Port || 4000;
connectDB()
connectCloudinary();

// middlewares
app.use(express.json());
  
app.use(cors({
  origin: "*",  // alllow all origines for testing ?
  methods: ['GET', 'POST'],
  credentials: true,  // Corrected typo here
}));


 
//endpoints

app.use("/api/admin", adminRouter);
app.use("/api/doctor" , doctorRouter)
app.use("/api/user" , userRouter)
//localhost:4000/api/admin/add-doctor

app.get("/",   (req, res) => {
  
  res.json("API WORKING VERY GOOD ...!");
});



app.listen(port, ( ) => {
  console.log("server is running on port");
 
});
