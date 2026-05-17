const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
    customerNAme:{type:String, required:true},
    phone:{type:String, required:true},
    items:[
        {
            name: String,
            price: Number,
            quantity: Number,
        }
    ],
    totalPrice:{type: Number, required: true},
    status: {type: String, default: "pending"},
    date: {type: Date, default: Date.now}
});
module.exports=mongoose.model("Order", orderSchema);
