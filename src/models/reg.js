const mongoose = require ("mongoose");

const bcrypt = require ("bcryptjs");

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


userSchema.pre("save",async function(next){
    
    if(this.isModified("password")){
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password,10);
        console.log(`the current password is ${this.password}`);
    }
    
    this.confirmpassword = undefined;
    next();

} )






// creating user collections

const Profile = new mongoose.model("Profile",userSchema)

module.exports= Profile
