const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
const orderRoutes=require("./routes/orderRoutes");
const quoteRoutes=require("./routes/quoteRoutes")
const adminRoutes=require("./routes/admin")
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("MongoDB Connected"))
    .catch((err)=>console.log(err));
app.use("/api/orders", orderRoutes);
app.use("/api/quotes", quoteRoutes);
app.use(".api/admin", adminRoutes);
app.get("/", (req,res)=> res.send("Bakerashque Backend Running"));
const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on {PORT}`))
