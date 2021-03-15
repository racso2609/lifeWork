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
const authenticated = require('../authenticate');

/* GET users listing. */
router.post('/signup', authenticated.validEmail, authenticated.validPassword, async (req, res) => {
  var { Firstname, Lastname, Email, Password, Phone } = req.body;

  try {
    const rol = await rolesModel.findOne({ Name: 'user' });
    await userModel.create({ Firstname, Lastname, Email, Password, Phone, Rol: rol._id });

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
    res.status(500).json({
      Token: null,
      Rol: null,
      Email: null,
      Phone: null,
      Firstname: null,
      Lastname: null,
      ErrMess: 'Something wrong',
      Message: null,
    })

  }

});
router.post('/login', authenticated.validEmail, authenticated.validPassword, async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await userModel.findOne({ Email: Email });
    if (user) {
      if (await user.isValidPassword(Password)) {
        const rol = await rolesModel.findById(user.Rol);
        const body = { _id: user._id, Email: user.Email, Rol: rol.Name, Phone: user.Phone, Name: user.Firstname + ' ' + user.Lastname };

        const token = jwt.sign({ user: body }, config.secretkey, { expiresIn: 7200 })
        res.status(200).json({
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
      } else {
        res.status(500).json({
          Token: null,
          Rol: null,
          Email: null,
          Phone: null,
          Firstname: null,
          Lastname: null,
          ErrMess: 'wrong Password',
          Message: null,
          isLogin: false,
          Err: true
        })
      }
    } else {
      res.status(500).json({
        Token: null,
        Rol: null,
        Email: null,
        Phone: null,
        Firstname: null,
        Lastname: null,
        ErrMess: 'User Don`t esxist',
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
      ErrMess: 'Somenthing wrong',
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
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const simpleTask = await simpleTaskModel.find({ AuthorId: req.user._id });
      console.log(simpleTask);
      res.status(200).json({
        ErrMess: null,
        Message: null,
        SimpleTask: simpleTask
      });

    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        ErrMess: 'We could not get the Task!!',
        Message: null
      })
    }
  })
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { Name, Description, FinishOn, AuthorName } = req.body;

    try {
      await simpleTaskModel.create({ Name: Name, Description: Description, FinishOn: FinishOn, AuthorId: req.user._id, AuthorName: AuthorName });
      const simpleTask = await simpleTaskModel.find({ AuthorId: req.user._id });

      res.status(200).json({
        ErrMess: null,
        Message: 'Task added',
        SimpleTask: simpleTask,
      })
    } catch (err) {

      console.log(err.message);
      res.status(500).json({
        ErrMess: 'Something is going bad!!!',
        Message: null,
      })
    }
  })
  .delete(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const deleted = await simpleTaskModel.deleteMany({ AuthorId: req.user._id });
      const Task = await simpleTaskModel.find({ AuthorId: req.user._id });

      res.status(200).json({
        ErrMess: null,
        Message: deleted.deletedCount + ' Simple Task were deleted',
        simpleTask: Task,
        Err: false
      })

    } catch (err) {

      console.log(err.message);
      res.status(500).json({
        ErrMess: 'Fail Deleting Simple Task',
        Message: null,
        Err: true
      })
    }
  })

router.route('/simple-task/:simpleTaskId')
  .put(passport.authenticate('jwt', { session: false }), async (req, res) => {

    const UpdateTask = req.body;
    try {
      const updated = await simpleTaskModel.updateOne({ _id: req.params.simpleTaskId }, UpdateTask);
      const simpleTask = await simpleTaskModel.find({ AuthorId: req.user._id })

      res.status(200).json({
        ErrMess: null,
        Message: updated.n + ' Simple Task were Updated Succesfully',
        SimpleTask: simpleTask,
        Err: false
      })
    } catch (err) {

      console.log(err.message);
      res.status(500).json({
        ErrMess: 'Imposible to do this right now',
        Message: null,
        Err: true
      });
    }
  })
  .delete(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const deleted = await simpleTaskModel.deleteOne({ _id: req.params.simpleTaskId });
      const SimpleTask = await simpleTaskModel.find({ AuthorId: req.user._id });

      res.status(200).json({
        ErrMess: null,
        Message: deleted.deletedCount + ' Simple Task were deleted',
        SimpleTask: SimpleTask,
        Err: false
      })
    } catch (err) {

      console.log(err.message);
      res.status(500).json({
        ErrMess: 'Fail Deleting Simple Task',
        Message: null,
        Err: true
      })
    }

  })

router.route("/medium-task")
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {

      const MediumTask = await mediumTaskModel.find({ AuthorId: req.user._id });
      res.status(200).json({
        MediumTask: MediumTask,
        Err: false,
        ErrMess: null,
        Message: MediumTask
      })


    } catch (err) {

      console.log(err.message);
      res.status(500).json({
        Err: true,
        ErrMess: 'We Couldn`t get medium task',
        Message: null
      })
    }
  })
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const { Name, Description, FinishOn, Steps, Complete } = req.body;
      const Author = await userModel.findById(req.user._id);
      await mediumTaskModel.create({ Name: Name, Description: Description, FinishOn: FinishOn, Steps: Steps, Complete: Complete, AuthorId: req.user._id, AuthorName: `${Author.Firstname} ${Author.Lastname}` });

      const MediumTask = await mediumTaskModel.find({ AuthorId: req.user._id });
      res.status(200).json({
        MediumTask: MediumTask,
        Err: false,
        ErrMess: null,
        Message: 'MediumTask Added correctly'
      })


    } catch (err) {

      console.log(err.message);
      res.status(500).json({
        Err: true,
        ErrMess: 'We Couldn`t Post this medium task',
        Message: null
      })
    }
  })
  .delete(passport.authenticate('jwt'), async (req, res) => {

    try {
      const deleted = await mediumTaskModel.deleteMany();
      const MediumTask = await mediumTaskModel.find({ AuthorId: req.user._id });


      res.status(200).json({
        Err: false,
        ErrMess: null,
        Message: deleted.deletedCount + ' Medium Task were deleted',
        MediumTask: MediumTask
      })

    } catch (err) {
      console.log(err.message);
      res.status(500).json({
        Err: true,
        ErrMess: "Imposible to delete",
        Message: null,

      })
    }
  })

router.route("/medium-task/:mediumTaskId")
  .put(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const MediumTaskToUPDATE = await mediumTaskModel.findById(req.params.mediumTaskId);

      const updateTask = {
        Name: req.body.Name ? req.body.Name : MediumTaskToUPDATE.Name,
        Date: req.body.Date ? new Date(req.body.Date) : MediumTaskToUPDATE.Date,
        Description: req.body.Description ? req.body.Description : MediumTaskToUPDATE.Description,
        Steps: req.body.Steps ? req.body.Steps : MediumTaskToUPDATE.Steps,
        Porcentaje: req.body.Porcentaje ? req.body.Porcentaje : MediumTaskToUPDATE.Porcentaje
      }

      const updated = await mediumTaskModel.updateOne(req.params.simpleTaskId, updateTask);

      const mediumTask = await mediumTaskModel.find({ AuthorId: req.user._id })

      res.status(200).json({
        ErrMess: null,
        Message: updated.n + ' Medium Task were Updated Succesfully',
        MediumTask: mediumTask,
        Err: false
      })
    } catch (err) {

      console.log(err.message);
      res.status(500).json({
        ErrMess: 'Imposible to do this right now',
        Message: null,
        Err: true
      });
    }
  })
  .post(passport.authenticate(jwt, { session: false }), async (req, res) => {

    const {SimpleTaskId} = req.body;
    try {
      const simpleTask = await simpleTaskModel.findById(SimpleTaskId);
      if (simpleTask) {
        const mediumTask = await mediumTaskModel.findById(req.params.mediumTaskId);
        if (mediumTask) {condition
          mediumTask.Steps.push(SimpleTaskId);
          mediumTask.save();
        }else{
          res.status(404).json({
            ErrMess: 'mediumTaskId dont exist',
            Message: null
          })
        }
      }else{
        res.status(500).json({
          ErrMess: 'The task that you want add dont exist',
          Message: null
        })
      }

    } catch (error) {
      
    }
  })
  .delete(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const deleted = await mediumTaskModel.deleteOne({ _id: req.params.mediumTaskId });
      const MediumTask = await mediumTaskModel.find({ AuthorId: req.user._id });

      res.status(200).json({
        ErrMess: null,
        Message: deleted.deletedCount + ' Medium Task were deleted',
        MediumTask: MediumTask,
        Err: false
      })
    } catch (err) {

      console.log(err.message);
      res.status(500).json({
        ErrMess: 'Fail Deleting Medium Task',
        Message: null,
        Err: true
      })
      res.statusCode = 500;
    }

  })
module.exports = router;
