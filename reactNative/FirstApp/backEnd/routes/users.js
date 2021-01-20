var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

const rolesModel = require('../models/roles');
const userModel = require('../models/users');
const simpleTaskModel = require('../models/SimpleTask');
const config = require('../config');
const authenticated = require('../authenticate');
const auth = require('../auth/validation');


/* GET users listing. */
router.post('/signup', async (req, res) => {
  var { Firstname, Lastname, Email, Password, Phone } = req.body;
  try {
    Email.toLowerCase();
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

  } catch (error) {
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
router.post('/login', async (req, res, next) => {
  const { Email, Password } = req.body;
  const Format = auth.isValidEmail(Email) && auth.isValidPassword(Password) ? true : false;
  try {

    if (Format) {
      const user = await userModel.findOne({ Email: Email });
      const validation = await user.isValidPassword(Password) && user ? true : false;

      if (validation) {

        const rol = await rolesModel.findById(user.Rol);
        const body = { _id: user._id, Email: user.Email, Rol: rol.Name, Phone: user.Phone, Name: user.Firstname + ' ' + user.Lastname };

        const token = jwt.sign({ user: body }, config.secretkey, { expiresIn: 7200 })
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
          ErrMess: 'Password don`t match' ,
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
  } catch (error) {
    
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
  .get(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const simpleTask = await simpleTaskModel.find({ Author: req.user._id });
      res.json({
        ErrMess: null,
        Message: simpleTask ? '' : 'Empty',
        SimpleTask: simpleTask,
        Err: false
      })
    } catch (error) {
      res.json({
        ErrMess: 'We could not connect at the server!!',
        Message: null,
        Err: true
      })

      res.statusCode = 500;
    }
  })
  .post(passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { Name, Description,FinishOn } = req.body;

    try {
      await simpleTaskModel.create({ Name: Name, Description: Description, FinishOn: FinishOn, Author: req.user._id });
      const simpleTask = await simpleTaskModel.find({ Author: req.user._id });

      res.json({
        ErrMess: null,
        Message: 'Task added',
        SimpleTask: simpleTask,
        Err: false
      })
    } catch (error) {
      res.json({
        ErrMess: 'Something is going bad!!!',
        Message: null,
        Err: true
      })
      res.statusCode= 500;
    }
  })
  .delete(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const deleted = await simpleTaskModel.deleteMany({ Author: req.user._id });
      const Task = await simpleTaskModel.find({ Author: req.user._id });

      res.json({
        ErrMess: null,
        Message: deleted.deletedCount + ' Simple Task were deleted',
        simpleTask: Task,
        Err: false
      })

    } catch (error) {
      res.json({
        ErrMess: 'Fail Deleting Simple Task',
        Message: null,
        Err: true
      })
      res.statusCode = 500;
    }
  })

router.route('/simple-task/:simpleTaskId')
  .put(passport.authenticate('jwt', { session: false }), async (req, res) => {

    const { Name, Date, Description } = req.body;
    try {
      const updated = await simpleTaskModel.update({ _id: req.params.simpleTaskId }, { Name, Date, Description });
      const simpleTask = await simpleTaskModel.find({ Author: req.user._id })

      res.json({
        ErrMess: null,
        Message: updated.n + ' Simple Task were Updated Succesfully',
        SimpleTask: simpleTask,
        Err: false
      })
    } catch (error) {
      res.json({
        ErrMess: 'Imposible to do this right now',
        Message: null,
        Err: true
      });
      res.statusCode = 500;
    }
  })
  .delete(passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
      const deleted = await simpleTaskModel.deleteOne({_id: req.params.simpleTaskId});
      const simpleTask = await simpleTaskModel.find({ Author: req.user._id });

      res.json({
        ErrMess: null,
        Message: deleted.deletedCount + ' Simple Task were deleted',
        SimpleTask: simpleTask,
        Err: false
      })
    } catch (error) {
      res.json({
        ErrMess: 'Fail Deleting Simple Task',
        Message: null,
        Err: true
      })
      res.statusCode = 500;
    }

  })
module.exports = router;
