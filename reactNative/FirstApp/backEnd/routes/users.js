var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

const rolesModel = require('../models/roles');
const userModel = require('../models/users');
const simpleTaskModel = require('../models/SimpleTask');
const mediumTaskModel = require('../models/MediumTask');


const config = require('../config');
const auth = require('../auth/validation');


/* GET users listing. */
router.post('/signup', async (req, res) => {
  var {Firstname, Lastname, Email, Password, Phone} = req.body;
  try {
    Email.toLowerCase();
    const rol = await rolesModel.findOne({Name: 'user'});
    await userModel.create({Firstname, Lastname, Email, Password, Phone, Rol: rol._id});

    res.json({
      Token: null,
      Rol: null,
      Email: null,
      Name: null,
      ErrMess: null,
      Message: 'Signup Succesfully',
      Err: false
    });

  } catch (err) {

    console.log(err.message);
    res.json({
      Token: null,
      Rol: null,
      Email: null,
      Phone: null,
      Firstname: null,
      Lastname: null,
      ErrMess: 'Something is bad',
      Message: null,
      isLogin: false,
      Err: true
    })
  }
});
router.post('/login', async (req, res) => {
  const {Email, Password} = req.body;
  const Format = auth.isValidEmail(Email) && auth.isValidPassword(Password) ? true : false;
  try {

    if (Format) {
      const user = await userModel.findOne({Email: Email});
      const validation = await user.isValidPassword(Password) && user ? true : false;

      if (validation) {

        const rol = await rolesModel.findById(user.Rol);
        const body = {_id: user._id, Email: user.Email, Rol: rol.Name, Phone: user.Phone, Name: user.Firstname + ' ' + user.Lastname};

        const token = jwt.sign({user: body}, config.secretkey, {expiresIn: 7200})
        res.json({
          Token: token,
          Rol: rol.Name,
          Email: user.Email,
          Phone: user.Phone,
          Firstname: user.Firstname,
          Lastname: user.Lastname,
          ErrMess: null,
          Message: null,
          isLogin: true,
          Err: false
        })
      } else {//if user dont exist or password dont match 


        res.json({
          Token: null,
          Rol: null,
          Email: null,
          Phone: null,
          Firstname: null,
          Lastname: null,
          ErrMess: 'Password don`t match',
          Message: null,
          isLogin: false,
          Err: true
        })
      }

    } else {//if bad info of request

      res.json({
        Token: null,
        Rol: null,
        Email: null,
        Phone: null,
        Firstname: null,
        Lastname: null,
        ErrMess: 'Credentials with bad format',
        Message: null,
        isLogin: false,
        Err: true
      })
    }
  } catch (err) {

    console.log(err.message);

    res.json({
      Token: null,
      Rol: null,
      Email: null,
      Phone: null,
      Firstname: null,
      Lastname: null,
      ErrMess: 'User not found',
      Message: null,
      isLogin: false,
      Err: true
    })
  }
})

// router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   res.send(req.user);
// })

router.route('/simple-task')
  .get(passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
      const simpleTask = await simpleTaskModel.find({Author: req.user._id});
      res.json({
        ErrMess: null,
        Message: simpleTask ? null : 'Empty',
        SimpleTask: simpleTask,
        Err: false
      })
    } catch (err) {

      console.log(err.message);
      res.json({
        ErrMess: 'We could not connect at the server!!',
        Message: null,
        Err: true
      })

      res.statusCode = 500;
    }
  })
  .post(passport.authenticate('jwt', {session: false}), async (req, res) => {
    const {Name, Description, FinishOn} = req.body;

    try {
      await simpleTaskModel.create({Name: Name, Description: Description, FinishOn: FinishOn, Author: req.user._id});
      const simpleTask = await simpleTaskModel.find({Author: req.user._id});

      res.json({
        ErrMess: null,
        Message: 'Task added',
        SimpleTask: simpleTask,
        Err: false
      })
    } catch (err) {

      console.log(err.message);
      res.json({
        ErrMess: 'Something is going bad!!!',
        Message: null,
        Err: true
      })
      res.statusCode = 500;
    }
  })
  .delete(passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
      const deleted = await simpleTaskModel.deleteMany({Author: req.user._id});
      const Task = await simpleTaskModel.find({Author: req.user._id});

      res.json({
        ErrMess: null,
        Message: deleted.deletedCount + ' Simple Task were deleted',
        simpleTask: Task,
        Err: false
      })

    } catch (err) {

      console.log(err.message);
      res.json({
        ErrMess: 'Fail Deleting Simple Task',
        Message: null,
        Err: true
      })
      res.statusCode = 500;
    }
  })

router.route('/simple-task/:simpleTaskId')
  .put(passport.authenticate('jwt', {session: false}), async (req, res) => {

    const {Name, Date, Description} = req.body;
    try {
      const updated = await simpleTaskModel.update({_id: req.params.simpleTaskId}, {Name, Date, Description});
      const simpleTask = await simpleTaskModel.find({Author: req.user._id})

      res.json({
        ErrMess: null,
        Message: updated.n + ' Simple Task were Updated Succesfully',
        SimpleTask: simpleTask,
        Err: false
      })
    } catch (err) {

      console.log(err.message);
      res.json({
        ErrMess: 'Imposible to do this right now',
        Message: null,
        Err: true
      });
      res.statusCode = 500;
    }
  })
  .delete(passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
      const deleted = await simpleTaskModel.deleteOne({_id: req.params.simpleTaskId});
      const simpleTask = await simpleTaskModel.find({Author: req.user._id});

      res.json({
        ErrMess: null,
        Message: deleted.deletedCount + ' Simple Task were deleted',
        SimpleTask: simpleTask,
        Err: false
      })
    } catch (err) {

      console.log(err.message);
      res.json({
        ErrMess: 'Fail Deleting Simple Task',
        Message: null,
        Err: true
      })
      res.statusCode = 500;
    }

  })

router.route("/medium-task")
  .get(passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {

      const MediumTask = await mediumTaskModel.find({Author: req.user._id});
      res.json({
        MediumTask: MediumTask,
        Err: false,
        ErrMess: null,
        Message: MediumTask 
      })
      

    } catch (err) {

      console.log(err.message);
      res.json({
        Err: true,
        ErrMess: 'We Couldn`t get medium task',
        Message: null
      })
      res.statusCode = 500;
    }
  })
  .post(passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
      const {Name, Description, FinishOn, Steps, Porcentaje} = req.body;
      await mediumTaskModel.create({Name: Name, Description: Description, FinishOn: FinishOn, Steps: Steps , Porcentaje: Porcentaje, Author: req.user._id});

      const MediumTask = await mediumTaskModel.find({Author: req.user._id});
      res.json({
        MediumTask: MediumTask,
        Err: false,
        ErrMess: null,
        Message: 'MediumTask Added correctly'
      })
      

    } catch (err) {

      console.log(err.message);
      res.json({
        Err: true,
        ErrMess: 'We Couldn`t Post this medium task',
        Message: null
      })
      res.statusCode = 500;
    }
  })
  .delete(passport.authenticate('jwt'),async (req,res)=>{

    try {
      const deleted = await mediumTaskModel.deleteMany();
      const MediumTask = await mediumTaskModel.find({Author: req.user._id});


      res.json({
        Err: false,
        ErrMess: null,
        Message: deleted.deletedCount + ' Medium Task were deleted',
        MediumTask: MediumTask
      })

    } catch (err) {
      console.log(err.message);
      res.json({
        Err: true,
        ErrMess: "Imposible to delete",
        Message: null,

      }) 
    }
  })

router.route("/medium-task/:mediumTaskId")
.put(passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const MediumTaskToUPDATE = await mediumTaskModel.findById(req.params.mediumTaskId);

    const updateTask = {
      Name: req.body.Name ? req.body.Name : MediumTaskToUPDATE.Name, 
      Date: req.body.Date ? new Date(req.body.Date) : MediumTaskToUPDATE.Date, 
      Description: req.body.Description ? req.body.Description : MediumTaskToUPDATE.Description, 
      Steps: req.body.Steps ? req.body.Steps : MediumTaskToUPDATE.Steps,
      Porcentaje: req.body.Porcentaje ? req.body.Porcentaje : MediumTaskToUPDATE.Porcentaje
    }
    
    const updated = await mediumTaskModel.updateOne(req.params.simpleTaskId,updateTask);
    
    const mediumTask = await mediumTaskModel.find({Author: req.user._id})

    res.json({
      ErrMess: null,
      Message: updated.n + ' Medium Task were Updated Succesfully',
      MediumTask: mediumTask,
      Err: false
    })
  } catch (err) {

    console.log(err.message);
    res.json({
      ErrMess: 'Imposible to do this right now',
      Message: null,
      Err: true
    });
    res.statusCode = 500;
  }
})
.delete(passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const deleted = await mediumTaskModel.deleteOne({_id: req.params.simpleTaskId});
    const MediumTask = await mediumTaskModelModel.find({Author: req.user._id});

    res.json({
      ErrMess: null,
      Message: deleted.deletedCount + ' Medium Task were deleted',
      MediumTask: MediumTask,
      Err: false
    })
  } catch (err) {

    console.log(err.message);
    res.json({
      ErrMess: 'Fail Deleting Medium Task',
      Message: null,
      Err: true
    })
    res.statusCode = 500;
  }

})
module.exports = router;
