const mongoose = require ("mongoose");


// creating user schema

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    emailID: {
        type:String,
        required:true,
        unique:true 
    },
    password: {
        type:String,
        required:true,
    },
    confirmpassword: {
        type:String,
        required:true
    }
},{timestamps: true})

// creating user collections

const Profile = new mongoose.model("Profile",userSchema)

module.exports= Profile
