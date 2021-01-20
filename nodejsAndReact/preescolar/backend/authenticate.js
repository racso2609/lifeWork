const passport = require("passport");
const config = require("./config");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("./model/user")
const roleModel = require("./model/roles");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

passport.use("signup",new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
},async(username, password,done)=>{
        try {
            const rol = await roleModel.find({name: "user"});
            const user = await userModel.create({username,password, rol: rol[0]._id});
            return done(null,user);
        } catch (error) {
            done(error);
        }
}))

passport.use("login",new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
}, async(username, password, done)=>{
    try {
        const user = await userModel.findOne({username});//exist or not
        if (!user) { return done(null,false, {message: "User not found"});}

        const validate = await user.isValidPassword(password);//correct password
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
  const rol = await roleModel.findById(req.user.rol);

    if (rol.name == "admin") {
        next();
    }else{
        const err = new Error("not authorized");
        return next(err);
    }
}
exports.userAuth = async(req,res,next)=>{
    const rol = await roleModel.findById(req.user.rol);
  
      if (rol.name == "user") {
          next();
      }else{
          const err = new Error("not authorized");
          return next(err);
      }
}
exports.moderatorAuth = async(req,res,next)=>{
    const rol = await roleModel.findById(req.user.rol);
  
      if (rol.name == "moderator") {
          next();
      }else{
          const err = new Error("not authorized");
          return next(err);
      }
}
