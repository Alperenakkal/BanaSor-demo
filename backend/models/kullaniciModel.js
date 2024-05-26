const mongoose =require('mongoose')
const userSchema =new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:"",
    },
    seviye:{
        type:String,
        default:"Seviye Belirtilmemiş"
    },
    followers:{
        type: [String],
        default : [],

    },
    following: {
        type:[String],
        default: [],
    }
},{timestamps:true});
const User =mongoose.model("User",userSchema);
module.exports= User;