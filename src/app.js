const express = require("express");

const path = require("path");

const app = express();

const hbs = require("hbs");

const bcrypt = require("bcryptjs") 

require("./db/conn");

const Profile = require("./models/reg");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");

const templates_path = path.join(__dirname,"../templates/views");

const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));

app.set("view engine","hbs");

app.set("views",templates_path);

hbs.registerPartials(partials_path);

app.get("/", (req,res) => {
   
    res.render("index")

});

app.get("/register", (req,res) => {
   
    res.render("register")

});

app.get("/login",(req,res) => {

    res.render("login");

})


// create a new user in db

app.post("/register",async(req,res) => {
    try{
        
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        if(password === confirmpassword){

            const profileUser = new Profile({
                username: req.body.username,
                emailID: req.body.emailID,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword

            })

            const reg = await profileUser.save();
            res.status(201).render("index");

        }else{
            res.send("passwords do not match")
        }

            /*
             console.log(req.body.firstname);
             res.send(req.body.firstname);
            */

    }catch(error){

        res.status(400).send(error);

    }
})

// login check

app.post("/login",async(req,res) => {
    try {

        const emailID = req.body.emailID;
        const password = req.body.password;

        const useremail = await Profile.findOne({emailID:emailID});

        
        const isMatch = await bcrypt.compare(password,useremail.password);

        if(isMatch){
            res.status(201).render("index");
        }
        else{
            res.send("invalid credentials");
        }
              
        /*
        if(useremail.password === password){
            res.status(201).render("index");
        }
        else{
            res.send("invalid credentials");
        }
        

        
        res.send(useremail);
        console.log(useremail);
        console.log(`$email is {emailID} and password is ${password}`)
        */
    } catch (error) {

        res.status(400).send("invalid credentials");

    }
})

app.listen(port,() => {
    
    console.log(`server is running at port no ${port}`);

})
