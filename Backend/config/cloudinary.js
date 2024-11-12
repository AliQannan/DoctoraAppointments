import { v2 as cloudinary } from "cloudinary";
const connectCloudinary = async () => {
  try {
    cloudinary.config({
          cloud_name: "ddxy4mev2",
          api_key: "787292674676147",
          api_secret:"fMFaHtjjPDVEhDj-ELWYb37n054" ,
      });
     
  } catch (err) {
    console.log(err.message);
  }
};



export default connectCloudinary;
