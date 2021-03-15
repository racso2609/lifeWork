const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const roleModel = require("./models/roles");
const config = require("./config");
const auth = require('./auth/validation');

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

exports.validEmail = async(req,res, next)=>{

      if (auth.isValidEmail(req.body.Email)) {
          next();
      }else{

          const err = new Error("Email not valid");
          console.log(err);
          return next(err);
      }
}

exports.validPassword = async(req,res, next)=>{

    if (auth.isValidPassword(req.body.Password)) {
        next();
    }else{
        const err = new Error("Password not valid");
        return next(err);
    }
}


