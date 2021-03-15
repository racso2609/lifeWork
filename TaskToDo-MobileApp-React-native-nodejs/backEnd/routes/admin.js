const express = require('express');
const passport = require('passport');
const router = express.Router();


const authenticated = require('../authenticate');
const message = require('../models/message');
const SimpleTask = require('../models/SimpleTask');


router.route('/message')
.delete( authenticated.adminAuth,async(req,res)=>{
    await message.deleteMany();
    const mes = await message.find();
    res.json(mes)
})
router.route('/simple-task')
.get(async(req,res)=>{
    
    const simpletask = await SimpleTask.find();
    res.json({Simpletask: SimpleTask})
})

module.exports = router;
