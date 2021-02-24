const passport = require("passport");
const config = require("./config");

const CoorpModel = require("./model/Corp")
const AdminModel = require("./model/Admin");

const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;


passport.use("login-Coorp",new LocalStrategy({
    usernameField: "Email",
    passwordField: "Password"
}, async(Email, Password, done)=>{
    try {
        const user = await CoorpModel.findOne({Email});//exist or not
        
        if (!user) { return done(null,false, {message: "Coorp not found"});}

        const validate = await user.isValidPassword(Password);//correct password
        if(!validate){ return done(null,false,{message:"Wrong Pasword"})};
        
        return done(null,user,{message:"Login Successfully"});//all good
    } catch (error) {
        return done(error);
    }
}))

passport.use("login-Admin",new LocalStrategy({
    usernameField: "Email",
    passwordField: "Password"
}, async(Email, Password, done)=>{
    try {
        const user = await AdminModel.findOne({Email});//exist or not
        
        if (!user) { return done(null,false, {message: "Coorp not found"});}

        const validate = await user.isValidPassword(Password);//correct password
        if(!validate){ return done(null,false,{message:"Wrong Pasword"})};
        
        return done(null,user,{message:"Login Successfully"});//all good
    } catch (error) {
        return done(error);
    }
}))

passport.use(new JwtStrategy({
    secretOrKey: config.secretkey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(config.secretkey)
}, async(token,done)=>{
    try {
        return done(null, token.user);
    } catch (error) {
        return done(error);
    }
}))

exports.adminAuth = async(req,res,next)=>{
  const Admin = await AdminModel.findOne({Email:req.user.Email});
  console.log(Admin);

    if (Admin) {
        next();
    }else{
        const err = new Error("not authorized");
        return next(err);
    }
}

