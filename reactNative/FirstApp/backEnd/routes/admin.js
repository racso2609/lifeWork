const express = require('express');
const passport = require('passport');
const router = express.Router();


const authenticated = require('../authenticate');
const message = require('../models/message');


router.route('/message')
.delete(async(req,res)=>{
    await message.deleteMany();
    const mes = await message.find();
    res.json(mes)
})

module.exports = router;
