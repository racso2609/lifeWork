var express = require('express');
const raisonModel = require('../models/raison');
var mongoose = require("mongoose")
const fs = require("fs");

var raisonRouter = express.Router();

raisonRouter.route("/")
.get(async (req,res)=>{
    
    const raisons = await raisonModel.find()
    res.json(raisons)
    
})
.post(async (req,res,next)=>{
    if (req.body) {
        try{            
          
            const raison = new raisonModel({
                title: req.body.title,
                raison: req.body.raison,
                img: "/images/reason/"+req.file.filename
            });
            
            await raison.save()
            const resp = await raisonModel.find()
            res.json(resp); 
            
        }catch(e){
            fs.unlinkSync("public/images/reason/"+req.file.filename)
            return next(e);
        }
        
    }
    
    
})
.delete(async (req,res)=>{
    
    const resp = await raisonModel.find();
    resp.forEach(raison => {
        fs.unlinkSync("public"+ raison.img);
        raison.remove();
    });
   
    const re = await raisonModel.find()
    res.json(re); 

})
raisonRouter.route("/:reasonId")
.get(async (req,res, next)=>{

    try{
        const raison = await raisonModel.findById(req.params.reasonId);
        res.json(raison);
    }catch(e){
        e.statusCode = 404;
        return next(e);
    }
    
    
    
})
.put(async(req,res)=>{
    await raisonModel.findByIdAndUpdate( req.params.raisonId, req.body);
    res.json({state: "your raison was modified"});
})
.delete(async(req,res,next)=>{
    try {
        const resp = await raisonModel.findById(req.params.reasonId);
        console.log(resp);
        fs.unlinkSync("public"+ resp.img);
        resp.remove();
        
        const re = await raisonModel.find();
        res.json(re); 
    } catch (e) {
        e = new Error("Not found")
        e.statusCode = 404;
        return next(e);
    }
    
})

module.exports = raisonRouter;