import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoutes.js";

// Initialize app and connect to database
const app = express();
const port = process.env.PORT || 4000;
connectDB(); 
connectCloudinary();

// CORS Configuration
app.use(cors({
  origin: [
    "https://doctora-appointments-users.vercel.app",
    "https://doctora-appointments-admin.vercel.app"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ["Content-Type", "Authorization", "token"], // Add 'token' here
  credentials: true
}));


// Middleware to parse JSON requests
app.use(express.json());

// Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// Health Check or Default Endpoint
app.get("/", (req, res) => {
  res.json({ message: "API WORKING VERY GOOD!" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
