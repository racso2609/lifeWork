const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');

const ratelimit = require('express-rate-limit');
const xss = require('xss-clean');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const passport = require('passport');
const mongoose = require('mongoose');

const socket = require('socket.io');
const multer = require('multer');

const config = require('./config');
const Roles = require("./initialSetUps");

var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

var env = require('node-env-file'); // .env file
env(__dirname + '/.env');


const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env;
const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI;

if (!connectionString) {
  console.error('Enviroment variable not charged');
}

var app = express();
var limit = ratelimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too Many request, you are locked for 1 hour'
});

//set 
app.set("PORT", process.env.PORT || 3001);
app.set("HOST", process.env.HOST || '192.168.0.103');


//Middleware
app.use(logger('dev'));//morgan
app.use(express.json({ limit: '1mb' })); //limit petition
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/build')));
app.use(mongoSanitize());

app.use(xss());
app.use(helmet());
app.use(cors()); //comunication between server
app.options('*', cors());
app.use(passport.initialize());
app.use('*', limit);

//Routes
app.use('/api/admin', adminRouter);
app.use('/api/users', usersRouter);
app.use((req, res) => {
  res.status(404).json({
    ErrMess: '404 NOT FOUND',
    Mess: null
  })
})



const server = http.createServer(app);
// const io = socket(server,{
//   cors: `http://${app.get('HOST')}:${app.get('PORT')}/`,
//   methods: ["GET","POST"]
// });


// require("./sockets")(io); 

server.listen(app.get("PORT"), () => {
  console.log("Server running on Port " + app.get("PORT"));

}).on("error", (err) => {
  console.log(err.message)

});




const connect = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
connect.then(() => {
  const connection = mongoose.connection;
  console.log("Correctly connect");
  Roles.createRoles();


  connection.on('error', (err) => console.log(err.message));

}).catch(err => console.log(err.message))




module.exports = app;
