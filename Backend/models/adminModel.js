import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    name : {type:String , required : true  },
    email : {type : String , required : true , unique:true },
    password: {type : String , required : true },
   
    //  address : {type : Object ,default : {line1 :"" , line2:""}} ,
    //  gender : {type : String , default:'Not Selected'},
    //  dob : {type : String , default:'Not Selected'},
    //   phone : {type : String , default:'0000000000'}
    
})


const adminModel = mongoose.models.admin ||  mongoose.model("admin",adminSchema)
export default adminModel ;