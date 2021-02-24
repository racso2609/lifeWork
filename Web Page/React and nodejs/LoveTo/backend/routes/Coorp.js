var express = require('express');
var router = express.Router();

const authenticated = require("../authenticate")
const passport = require("passport");
const config = require('../config');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const coorpModel = require("../model/Corp");
const farmerModel = require("../model/Farmer");
const walkerModel = require("../model/Walker");
const adminModel = require("../model/Admin");

const { transpoter } = require('../nodemail/transporter');


/* SignUP and Login. */
router.post("/signup", async(req,res)=>{
  const {Firstname, Lastname, Address,PostCode,  Suburb, State, Email, Phone, Password,CoopName} = req.body;
  try {
    const coorp = await coorpModel.create({Firstname,Lastname,Address,PostCode,Suburb,State,Email,Phone,Password,CoopName,Banned:false});
    res.json({message: "Sign up succesfully"})
    
  } catch (error) {
    res.statusCode = 500;
    res.json ({errMess: error.message})
  }
    
  
})
router.post("/login", async(req,res,next)=>{
  passport.authenticate("login-Coorp", async(err,Coorp,info)=>{
    try {

      if (err || !Coorp || Coorp.Banned ) {// if Coorp not exist or an error or is banned
        const error = new Error("Credentials don't match");
        res.json({errMess: error.message});
        return;
      }

      req.login(Coorp, { session: false }, async (err) => {// create a jwt
        if (err) {return next(err);}
        const body = {_id: Coorp._id, Email: Coorp.Email,Firstname: Coorp.Firstname, Lastname: Coorp.Lastname,CoopName: Coorp.CoopName};
        
        const Token = jwt.sign({user:body}, config.secretkey,{expiresIn: 7200});//encrypt
        res.json({token:Token, email: Coorp.Email});

        })
    } catch (error) {
      res.statusCode=500;
      res.json({errMess: error.message});
      
    }
  })(req, res, next)
})
router.get("/logout",passport.authenticate("jwt", {session: false}), async(req,res,next)=>{
  req.user = null;
  res.json({
    email: null,
    token: null,
    errMess: null,
    message: null,
    farmers:[],
    walkers:[],
    coops:[],
    profile: {},
    login:false
  })
})
  
//reset-password
router.post("/reset-password", async(req,res)=>{

  const Email = req.body;
  console.log(req.body);
    const coorp = await coorpModel.findOne(Email);
    
    
    if(coorp){
      var mailOptions = {
        from: `Correo <${config.mail}>`,
        to: coorp.Email,
        subject: "Change password",
        html: `
        <div style= "width:40%; justify-items: center; text-align: center; border: 2px solid #2423231e; margin:auto; padding: 10px;  border-radius: 15px; padding: 10px; " >

        <img style="margin:auto;"src="cid:logo"/> <br>
        <span style="color: gray; margin-bottom: 100;">You told us you forgot your password. If you really did,<br/>
        click here to choose a new one:</span>
            <br/>
            <br/>
            <a href= "http://localhost:3001/reset-password/${coorp._id}" style="color: #ffffff; text-decoration: none;">

                <div style="margin:auto; border-radius:20px; padding:5px; background-color:#25bebe; color: #ffffff; width:60%;">Choose a new password</div>
            </a>
            <p style="color: gray;"> If you didn’t mean to reset your password, then you can just <br/>
            ignore this email; your password will not change.</p>
        </div>
        
        `,
        
        attachments: [{
            filename: 'Screenshot_3.png',
            path: __dirname.slice(0,-6)  +'public/images/icons/Screenshot_3.png',
            cid: 'logo' 
        }]
    };

    transpoter.sendMail(mailOptions, (err)=>{
        if(err){
            res.statusCode = 500;
            res.json({errMess: "Error sending Link"});
        }else{
            res.statusCode =200;
            res.json({message:"Email send"});
        }
    })
    }else{
      res.statusCode = 500;
      res.json({errMess: "Error sending Link"})
    }
  
})
router.put("/reset-password/:userId", async(req,res,next)=>{
  try {
    const Password = req.body.Password;
    const hash = await bcrypt.hash(Password,10);
    
    const update = await coorpModel.findByIdAndUpdate(req.params.userId, {Password: hash});
    
    res.json({message:"Password-Reset successfully"})
    //res.redirect("/login")
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: "Please try again"})
  }
})
//Edit profile

router.route("/profile")
.get(passport.authenticate("jwt", {session: false}), async(req,res)=>{
  try {

    const coop = await coorpModel.findById(req.user._id);
    res.json({profile: coop});
  } catch (error) {
    res.json({errMess: error.message})
    
  }
})
.put(passport.authenticate("jwt", {session: false}), async(req,res,next)=>{
  const Coop = req.body.coop;
  if (!req.body.Password && !req.body.password) {
    try {
      
      await coorpModel.findByIdAndUpdate(req.user._id, Coop);
      const updated = await coorpModel.findById(req.user._id);
      res.json({profile: updated, message:"Update succesfully"})
    } catch (error) {
      res.json({errMess:"Error updating please try again"})
      
    }
  }else{
    res.json({errMess: "Error updating please try again"})
  }

})

//Get Post Delete farmers
router.route("/farmers")
.get(passport.authenticate("jwt", {session: false}), async(req,res)=>{
  
  try {
    const admin = await adminModel.findById(req.user._id);
    if (admin) {
      const farmers = await farmerModel.find();
      res.json({farmers:farmers});
      
    }else{
      const farmers = await farmerModel.find({Coop: req.user._id});
      res.json({farmers:farmers});
      
    }
    
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }

})
.post(passport.authenticate("jwt", {session: false}), async(req,res)=>{ 
  const {farmer} = req.body;
  farmer.CoopName = req.user.CoopName;
  farmer.Coop = req.user._id;
  
  try {
    
    await farmerModel.create(farmer);
    
    const farmers = await farmerModel.find({Coop: req.user._id});
    res.json({farmers:farmers});
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message});
  }

})
.delete(passport.authenticate("jwt", {session: false}), async(req,res)=>{
  try {
    await farmerModel.deleteMany({Coorp: req.user._id});
    const farmers =   await farmerModel.find({Coorp: req.user._id});
    res.json({message:"Farmers Delete",farmers:farmers});
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }
});

router.route("/farmer/:farmerId")
.put(passport.authenticate("jwt", {session: false}), async(req,res)=>{
  const {Banned} = req.body;
  try {
    await farmerModel.findByIdAndUpdate(req.params.farmerId,{Banned: Banned});
    const admin = adminModel.findById(req.user._id);
    if (admin) {
      const farmers = await farmerModel.find();
      res.json({farmers:farmers})
      
    }else{
      const farmers = await farmerModel.find({Coorp: req.user._id});
      res.json({farmers:farmers});
    }
    
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }

})
.delete( passport.authenticate("jwt", {session:false}), async(req,res)=>{

  try {
    await farmerModel.findByIdAndDelete(req.params.farmerId);
    const farmers = farmerModel.find();
    res.json({message:"Delete Farmer", farmers:farmers});
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }
})


router.route("/walkers")
.get(passport.authenticate("jwt", {session: false}), async(req,res)=>{
  try {
    const admin = await adminModel.findById(req.user._id);
    if (admin) {
      const walkers = await walkerModel.find();
      res.json({walkers:walkers});
      
    }else{
      const walkers = await walkerModel.find({Coop: req.user._id});
      res.json({walkers:walkers});
      
    }
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }

})
.post(passport.authenticate("jwt", {session: false}), async(req,res)=>{
  const {walker} = req.body;
  walker.CoopName = req.user.CoopName;
  walker.Coop = req.user._id;
  if (!walker.Banned) {
    walker.Banned=false;
  }

  try {
    await walkerModel.create(walker);
    const walkers = await walkerModel.find({Coop: req.user._id});
    res.json({walkers:walkers});
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message});
  }

})
.delete(passport.authenticate("jwt", {session: false}), async(req,res)=>{
  try {
    await farmerModel.deleteMany({Coop: req.user._id});
    const walkers =   await walkerModel.find({Coop: req.user._id});
    res.json({message:"walkers Delete",walkers:walkers});
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }
});
router.route("/walker/:walkerId")
.put(passport.authenticate("jwt", {session: false}), async(req,res)=>{
  const {Banned}=req.body;
  try {
    const walker = await walkerModel.findByIdAndUpdate(req.params.walkerId,{Banned:Banned});
    const walkers = await walkerModel.find({Coop: req.user._id});
    res.json({walkers:walkers});
    
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }

})
.delete( passport.authenticate("jwt", {session:false}), async(req,res)=>{
  
  try {
    await farmerModel.findByIdAndDelete(req.params.walkerId);
    const walker = walkerModel.find();
    res.json({message:"Delete walker", walker:walker});
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }
})
module.exports = router;
