import mongoose from "mongoose";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000; // 3 seconds

const connectDB = async () => {
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      console.log("Attempting to connect to MongoDB at:", process.env.MONGODB_URL);

      // Connect to MongoDB with optimized settings for network resilience
      await mongoose.connect(`${process.env.MONGODB_URL}/prescripto`, {
        serverSelectionTimeoutMS: 5000, // Fail after 5 seconds if unable to connect
        socketTimeoutMS: 45000, // Maintain socket for 45 seconds for slow networks
        connectTimeoutMS: 10000, // Timeout after 10 seconds if the initial connection is slow
        family: 4 // Use IPv4 for better compatibility on certain networks
      });

      console.log("MongoDB connected successfully");
      break; // Exit the retry loop on successful connection

    } catch (err) {
      attempts += 1;
      console.error(`MongoDB connection attempt ${attempts} failed:`, err);

      if (attempts < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      } else {
        console.error("All attempts to connect to MongoDB failed. Please check your connection.");
      }
    }
  }
};

export default connectDB;
