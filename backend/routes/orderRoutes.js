const express=require("express");
const router=express.Router();
const Order=require("../models/order");
router.post("/", async(req,res)=>{
    try{
        const order=new Order(req.body);
        await order.save();
        res.status(201).json({message:"Order placed!", order});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});
router.get("/", async(req,res)=>{
    try{
        const orders=await Order.find().sort({date:-1});
        res.json(orders);
    }catch(err){
        res.status(500).json({ error: err.message});
    }
});
module.exports=router;
