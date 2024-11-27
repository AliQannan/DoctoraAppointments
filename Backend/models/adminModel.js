import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    name : {type:String , required : true ,default : 'admin' },
    email : {type : String , required : true , unique:true , default : 'admin@gmail.com'},
    password: {type : String , required : true , default : "$2b$10$JEGbul8WTPedej8OKRgbMOxXzwE4GcTW2ylVRAe01EQ78cwTVgVyq"},
   
    //  address : {type : Object ,default : {line1 :"" , line2:""}} ,
    //  gender : {type : String , default:'Not Selected'},
    //  dob : {type : String , default:'Not Selected'},
    //   phone : {type : String , default:'0000000000'}
    
})


const adminModel = mongoose.models.admin ||  mongoose.model("admin",adminSchema)
export default adminModel ;