var express = require('express');
var router = express.Router();
const authenticated = require("../authenticate")
const passport = require("passport");
const config = require('../config');
const jwt = require("jsonwebtoken");

const rolesModel = require("../model/roles");
const userModel = require("../model/user")


/* GET users listing. */

router.get("/", passport.authenticate("jwt",{session: false}),authenticated.adminAuth,async(req,res)=>{
  
    const user = await userModel.find();
    res.json({user:user, token: req.user});
 
  
})
router.delete("/", passport.authenticate("jwt",{session: false}),authenticated.adminAuth,async(req,res)=>{
  const Users =  await userModel.find().populate("Rol");
  Users.forEach(async (user) => {
     
    const rol = await rolesModel.findById(user.rol);
    console.log(rol);
    if (rol.name != "admin") {
      await userModel.findByIdAndRemove(user._id);
      await user.save();
    }
  });
  const resp =  await userModel.find().populate("Rol");
  
  res.json({message:"Delete all", resp: resp}) 

})
router.post("/signup", passport.authenticate("signup", {session: false}), async(req,res)=>{
  res.json({
    message: "Signup Succesfyl",
    user: req.user
  })
})
router.post("/admin/signup",passport.authenticate("jwt",{session: false}),authenticated.adminAuth, async(req,res)=>{



  
  
    try {
      const {username, password, rol} = req.body

      const foundRol = await rolesModel.findOne({name:rol});
      console.log(foundRol);
      await userModel.create({username, password, rol: foundRol._id});
      const user = await userModel.findOne({username}).populate("rol"); 

      res.json({
        message: "Signup Succesfyl",
        user: user
      })    
    } catch (error) {
      res.json({message: error.message})
    }
  

 
})
router.post("/login", async(req,res,next)=>{

  passport.authenticate("login", (err,user,info)=>{
    try {
      if (err || !user) {// if user not exist or an error
        const error = new Error("new Error");
        return next(error);
      }

      req.login(user, { session: false }, async (err) => {// create a jwt
        if (err) return next(err);
        const body = {_id: user._id, username: user.username, rol: user.rol};
        
        const rol = await rolesModel.findById(user.rol);

        const token = jwt.sign({user:body}, config.secretkey,{expiresIn: 7200});//encrypt
        return res.json({token, rol: rol.name})

      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
})


module.exports = router;
