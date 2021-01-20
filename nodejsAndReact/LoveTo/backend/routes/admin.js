const express = require('express');
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {transpoter} = require("../nodemail/transporter")

const authenticated = require("../authenticate");
const config = require('../config');

const coorpModel = require("../model/Corp");
const AdminModel = require("../model/Admin");
const walkerModel = require("../model/Walker");
const farmerModel = require("../model/Farmer");


//invite, login and signup(just to admin)
router.post("/invite",  (req,res)=>{
    
    const {CoopName,ContactPerson,Email} = req.body;

       
        
        var mailOptions = {
            from: `Correo <${config.mail}>`,
            to: Email,
            subject: "Invitation",
            html: `
            <div style= "width:50%; justify-items: center; text-align: center; border: 2px solid #2423231e ;  margin:auto; border-radius: 15px; padding: 10px; " >

            <img style="margin:auto;"src="cid:logo"/> <br>
            <span style="color: gray;">Your coop have been invited to join loveTo platform
                please click the link bellow to sign up to the platform</span>
                <br/>
                <br/>
                <a href="http://localhost:3001/signup-Coorp/${CoopName}" style="color: #ffffff; text-decoration: none;">

                    <div style="margin:auto; border-radius:20px; padding:10px; background-color:#25bebe; color: #ffffff; width: 60%;">Accept Invitation</div>
                </a>
                <p style="color: gray;"> hello ${ContactPerson}, i'm invite you to form part of ${CoopName}</p>
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
                res.json({message: err.message});
            }else{
                res.json({message:"Email send"});
            }
        })
        

})
router.post("/signup",passport.authenticate("jwt",{session: false}),authenticated.adminAuth,async(req,res)=>{
  
  const Email = req.body.Email;
  const Password = req.body.Password;
  
    try {
      Email.toLowerCase();
      
      await AdminModel.create({Email: Email, Password: Password});
      const Admin = await AdminModel.findOne({Email}); 

      res.json({
        message: "Signup Succesfyl",
        Admin: Admin
      })    
    } catch (error) {
      res.json({message: error.message})
    }
  

 
})
router.post("/login", async(req,res,next)=>{
  passport.authenticate("login-Admin", async(err,Admin,info)=>{
    try {

      if (err || !Admin || Admin.Banned ) {// if Admin not exist or an error or is banned
        const error = new Error("Admin don't exist or are banned");
        return res.json({errMess: error.message})
      }

      req.login(Admin, { session: false }, async (err) => {// create a jwt
        if (err) return next(err);
        const body = {_id: Admin._id, Email: Admin.Email};
        
        const Token = jwt.sign({user: body}, config.secretkey,{expiresIn: 7200});//encrypt
        res.json({token: Token, email: Admin.Email})

      })
    } catch (error) {
      res.json({errMess: error.message})
      
    }
  })(req, res, next)
})

//delete(not admin) and see users
router.get("/coorp", passport.authenticate("jwt",{session: false}),authenticated.adminAuth,async(req,res)=>{
  
  try {
    const Coorp = await coorpModel.find().populate("Coorp");
    res.json({Coorp:Coorp});
    
  } catch (error) {
    res.json({errMess: error.message});
  }
 
  
})
router.delete("/coorp", passport.authenticate("jwt",{session: false}),authenticated.adminAuth,async(req,res)=>{
  
  await coorpModel.deleteMany();
  const resp =  await coorpModel.find();
  
  res.json({message:"Delete all", resp: resp}) 

})
router.delete("/coorp/:coorpId",passport.authenticate("jwt",{session: false}),authenticated.adminAuth,async(req,res)=>{
  await coorpModel.findByIdAndDelete(req.params.coorpId);
  const resp =  await coorpModel.find();
  
  res.json({message:"Delete Coorp", resp: resp}) 

})
//
router.route("/coorp/:coorpId")
.put(passport.authenticate("jwt",authenticated.adminAuth , {session: false}), async(req,res)=>{
  const {id,Banned}=req.body;
  try {
    await coorpModel.findByIdAndUpdate(id,{Banned: Banned});
    const coops = await coorpModelModel.find();
    res.json({coops:coops});
    
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }

})
//Get Delete farmers
router.route("/farmers")
.delete(passport.authenticate("jwt", {session: false}),authenticated.adminAuth, async(req,res)=>{
  try {
    await farmerModel.deleteMany({});
    const farmers =   await farmerModel.find();
    res.json({message:"Farmers Delete",farmers:farmers});
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }
});
router.delete("/farmers/:farmerId", passport.authenticate("jwt",authenticated.adminAuth, {session:false}), async(req,res)=>{

  try {
    await farmerModel.findByIdAndDelete(req.params.farmerId);
    const farmers = farmerModel.find();
    res.json({message:"Delete Farmer", farmers:farmers});
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }
})

//Get Delete walkers
router.route("/walkers")
.get(passport.authenticate("jwt", {session: false}),authenticated.adminAuth, async(req,res)=>{
  try {
    const walkers = await walkerModel.find();
    res.json({walkers:walkers});
    
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }

})
.delete(passport.authenticate("jwt", {session: false}),authenticated.adminAuth, async(req,res)=>{
  try {
    await walkerModel.deleteMany();
    const walkers =   await walkerModel.find({Coorp: req.user._id});
    res.json({message:"walkers Delete",walkers:walkers});
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }
});
router.delete("/walkers/:walkerId", passport.authenticate("jwt",authenticated.adminAuth, {session:false}), async(req,res)=>{

  try {
    await walkerModel.findByIdAndDelete(req.params.walkerId);
    const walkers = walkerModel.find();
    res.json({message:"Delete walker", walkers:walkers});
  } catch (error) {
    res.statusCode=500;
    res.json({errMess: error.message})
  }
})
module.exports = router;
