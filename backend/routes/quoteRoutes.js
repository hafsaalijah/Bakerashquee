const express= require("express");
const router= express.Router();
const quote= require("../models/quoteRequest");
router.post("/", async(req, res)=>{
    try{
        const quote= new QuoteRequest (req.body);
        await quote.save();
        res.status(201).json({message: "Request Submitted!", quote});
    }catch(err){
        req.status(500).json({message: error.message});
    }
});
router.get("/", async(req,res)=>{
    try{
        const quotes=await QuoteRequest.find().sort({date:-1});
        res.json(quotes);
    }catch{
        res.status(500).json({message:error.message});
    }
});
module.exports=router;
