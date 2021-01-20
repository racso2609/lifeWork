const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');

const ratelimit = require('express-rate-limit');
const xss = require('xss-clean');
const cors = require('cors');
const multer = require('multer');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const mongoose = require('mongoose');
const socket = require('socket.io');

const config = require('./config');
const Roles = require("./initialSetUps");

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

Roles.createRoles();


var app = express();
var limit = ratelimit({
  max:100,
  windowMs: 60*60*1000,
  message: 'Too Many request, you are locked for 1 hour'
});

//set 
app.set("PORT", process.env.port || 3001);


//Middleware
app.use(logger('dev'));//morgan
app.use(express.json({limit: '1mb'})); //limit petition
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(xss());
app.use(helmet());
app.use(cors()); //comunication between server
app.options('*',cors());
app.use(passport.initialize());
app.use('*',limit);

//Routes
app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);


const server = http.createServer(app);
const io = socket(server,{
  cors: "http://localhost:3001/",
  methods: ["GET","POST"]
});


require("./sockets")(io); 


server.listen(app.get("PORT"),()=>{
  console.log("Server on Port "+ app.get("PORT"));
});

const connect = mongoose.connect(config.mongoUrl,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

connect.then((db)=>console.log("Correctly Connect"));


module.exports = app;
