const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const roleModel = require("./models/roles");
const config = require("./config");

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


