const mongoose=require("mongoose");
const quoteSchema=new mongoose.Schema({
    customerName:{type:String, required:true},
    phone: {type:String, required:true},
    cakeType: {type:String, required:true},
    size: {type:String, required:true},
    designDescription: {type:String},
    occasion: {type:String},
    budget: {type:String},
    date: {type:Date, default: Date.now}
});
module.exports=mongoose.model("QuoteRequest", quoteSchema);
